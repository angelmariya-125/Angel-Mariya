"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import { Play, RotateCcw, Trophy, Gamepad2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { portfolioContent } from "@/data/content";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Point = { x: number; y: number };

const GRID_SIZE = 20;
const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION: Direction = "UP";

export function GameSection() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nextDirectionRef = useRef<Direction>(INITIAL_DIRECTION);

  // Load high score from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("angel_portfolio_snake_highscore");
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {
      // Local storage unavailable
    }
  }, []);

  // Simple Web Audio API retro beep
  const playBeep = useCallback((freq = 440, type: OscillatorType = "square", duration = 0.08) => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio not supported or blocked
    }
  }, [soundEnabled]);

  const generateFood = useCallback((currentSnake: Point[]): Point => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const collision = currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!collision) break;
    }
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    nextDirectionRef.current = INITIAL_DIRECTION;
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setIsGameOver(false);
    setIsRunning(true);
    playBeep(600, "triangle", 0.1);
  }, [generateFood, playBeep]);

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "s", "a", "d"].includes(e.key)) {
        e.preventDefault();
      }

      if (!isRunning && (e.key === "Enter" || e.key === " ")) {
        resetGame();
        return;
      }

      const current = nextDirectionRef.current;
      if ((e.key === "ArrowUp" || e.key === "w" || e.key === "W") && current !== "DOWN") {
        nextDirectionRef.current = "UP";
        setDirection("UP");
      } else if ((e.key === "ArrowDown" || e.key === "s" || e.key === "S") && current !== "UP") {
        nextDirectionRef.current = "DOWN";
        setDirection("DOWN");
      } else if ((e.key === "ArrowLeft" || e.key === "a" || e.key === "A") && current !== "RIGHT") {
        nextDirectionRef.current = "LEFT";
        setDirection("LEFT");
      } else if ((e.key === "ArrowRight" || e.key === "d" || e.key === "D") && current !== "LEFT") {
        nextDirectionRef.current = "RIGHT";
        setDirection("RIGHT");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, resetGame]);

  // Main game tick loop
  useEffect(() => {
    if (!isRunning || isGameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };
        const currentDir = nextDirectionRef.current;

        if (currentDir === "UP") head.y -= 1;
        if (currentDir === "DOWN") head.y += 1;
        if (currentDir === "LEFT") head.x -= 1;
        if (currentDir === "RIGHT") head.x += 1;

        // Check Wall Collisions
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setIsGameOver(true);
          setIsRunning(false);
          playBeep(180, "sawtooth", 0.3);
          return prevSnake;
        }

        // Check Self Collisions
        for (const segment of prevSnake) {
          if (segment.x === head.x && segment.y === head.y) {
            setIsGameOver(true);
            setIsRunning(false);
            playBeep(180, "sawtooth", 0.3);
            return prevSnake;
          }
        }

        const newSnake = [head, ...prevSnake];

        // Check Food Eaten
        if (head.x === food.x && head.y === food.y) {
          const nextScore = score + 1;
          setScore(nextScore);
          playBeep(880, "square", 0.08);

          if (nextScore > highScore) {
            setHighScore(nextScore);
            try {
              localStorage.setItem("angel_portfolio_snake_highscore", nextScore.toString());
            } catch {}
          }

          if (nextScore > 0 && nextScore % 5 === 0) {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 },
              colors: ["#10b981", "#000000", "#ffffff"],
            });
          }

          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isRunning, isGameOver, food, score, highScore, generateFood, playBeep]);

  // Render to Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const cellSize = size / GRID_SIZE;

    // Clear board
    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(0, 0, size, size);

    // Subtle Grid pattern
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, size);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(size, i * cellSize);
      ctx.stroke();
    }

    // Render Food (Pixel fruit)
    ctx.fillStyle = "#10b981";
    ctx.shadowColor = "#10b981";
    ctx.shadowBlur = 8;
    ctx.fillRect(
      food.x * cellSize + 2,
      food.y * cellSize + 2,
      cellSize - 4,
      cellSize - 4
    );
    ctx.shadowBlur = 0;

    // Render Snake
    snake.forEach((segment, index) => {
      if (index === 0) {
        ctx.fillStyle = "#ffffff"; // Head
      } else {
        ctx.fillStyle = "#a3a3a3"; // Body
      }
      ctx.fillRect(
        segment.x * cellSize + 1.5,
        segment.y * cellSize + 1.5,
        cellSize - 3,
        cellSize - 3
      );
    });
  }, [snake, food]);

  const handleDpad = (newDir: Direction) => {
    if (!isRunning && !isGameOver) {
      resetGame();
      return;
    }
    const current = nextDirectionRef.current;
    if (newDir === "UP" && current !== "DOWN") nextDirectionRef.current = "UP";
    if (newDir === "DOWN" && current !== "UP") nextDirectionRef.current = "DOWN";
    if (newDir === "LEFT" && current !== "RIGHT") nextDirectionRef.current = "LEFT";
    if (newDir === "RIGHT" && current !== "LEFT") nextDirectionRef.current = "RIGHT";
  };

  return (
    <section
      id="game"
      className="py-24 sm:py-32 border-b border-[#0a0a0a]/5 dark:border-white/5 relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#0a0a0a]/10 dark:border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#737373] dark:text-[#888888]">
                03 // Interactive
              </span>
              <span className="font-pixel text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {portfolioContent.game.badge}
              </span>
            </div>
            <h2 className="font-grotesk text-3xl sm:text-5xl font-semibold tracking-tight text-[#0a0a0a] dark:text-[#f5f5f5]">
              {portfolioContent.game.title}
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#525252] dark:text-[#a3a3a3] font-normal leading-relaxed">
            {portfolioContent.game.description}
          </p>
        </div>

        {/* Game Arcade Container */}
        <div className="max-w-3xl mx-auto rounded-3xl border border-[#0a0a0a]/15 dark:border-white/20 bg-[#0a0a0a] text-white p-4 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Retro Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-white/10 mb-6 font-pixel">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              <span className="text-[11px] sm:text-xs tracking-wider text-emerald-400">PIXEL_SNAKE.EXE</span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 text-xs tracking-wider">
              <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] sm:text-xs">
                <span>SCORE:</span>
                <span className="text-white font-bold">{score.toString().padStart(2, "0")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400 text-[11px] sm:text-xs">
                <Trophy className="w-3.5 h-3.5" />
                <span>HI:</span>
                <span className="font-bold">{highScore.toString().padStart(2, "0")}</span>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Toggle Sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Canvas Viewport */}
          <div className="relative aspect-square max-w-[420px] mx-auto rounded-xl overflow-hidden border border-white/15 bg-[#0d0d0d] shadow-inner flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="w-full h-full pixel-art block"
            />

            {/* Start / Game Over Screen Overlay */}
            {(!isRunning || isGameOver) && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center font-pixel">
                {isGameOver ? (
                  <>
                    <span className="text-red-500 text-lg sm:text-xl tracking-widest mb-2 animate-bounce">
                      GAME OVER
                    </span>
                    <span className="text-xs text-zinc-400 mb-6 font-mono">
                      FINAL SCORE: {score}
                    </span>
                    <button
                      onClick={resetGame}
                      className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs tracking-wider font-bold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>PLAY AGAIN</span>
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-white text-base sm:text-lg tracking-widest mb-2">
                      READY TO PLAY?
                    </span>
                    <span className="text-[11px] text-zinc-400 mb-6 font-mono max-w-xs">
                      Use Arrow Keys, WASD, or the touch controls below.
                    </span>
                    <button
                      onClick={resetGame}
                      className="px-6 py-2.5 rounded-lg bg-white hover:bg-emerald-400 text-black text-xs tracking-wider font-bold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>START GAME</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Controls: Mobile D-Pad & Keyboard Hints */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
            <div className="text-zinc-400 text-center sm:text-left">
              <span className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
                CONTROLS
              </span>
              <span>Arrow Keys / W-A-S-D to steer</span>
            </div>

            {/* Virtual D-Pad for Mobile and Touch Navigation */}
            <div className="flex flex-col items-center gap-1 sm:hidden">
              <button
                onClick={() => handleDpad("UP")}
                className="w-12 h-10 rounded-lg bg-zinc-800 active:bg-emerald-500 active:text-black flex items-center justify-center text-white"
                aria-label="Up"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleDpad("LEFT")}
                  className="w-12 h-10 rounded-lg bg-zinc-800 active:bg-emerald-500 active:text-black flex items-center justify-center text-white"
                  aria-label="Left"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDpad("DOWN")}
                  className="w-12 h-10 rounded-lg bg-zinc-800 active:bg-emerald-500 active:text-black flex items-center justify-center text-white"
                  aria-label="Down"
                >
                  <ArrowDown className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDpad("RIGHT")}
                  className="w-12 h-10 rounded-lg bg-zinc-800 active:bg-emerald-500 active:text-black flex items-center justify-center text-white"
                  aria-label="Right"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={resetGame}
                className="px-3.5 py-1.5 rounded-lg border border-white/20 text-zinc-300 hover:text-white hover:border-white transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

