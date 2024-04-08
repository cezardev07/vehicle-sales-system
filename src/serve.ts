import express from "express";
import App from "./app/app";
import "dotenv/config"

/**
 * @description PORT environment (.env) or default("3333")
 **/
export const port = process.env.PORT || 3333
/**
 * @description HOST environment (.env) or default("localhost")
 **/
export const host = process.env.HOST || "localhost"

const app = new App(express())

app.serve({
  port: Number(port),
  feedback: `\n http://${host}:${port}`
})