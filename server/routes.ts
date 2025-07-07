import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRegistrationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Registration submission endpoint
  app.post("/api/register", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertRegistrationSchema.parse(req.body);
      
      // Check if email already exists
      const existingRegistration = await storage.getRegistrationByEmail(validatedData.email);
      if (existingRegistration) {
        return res.status(400).json({ 
          message: "Email already registered. Only one registration per email is allowed." 
        });
      }
      
      // Create registration
      const registration = await storage.createRegistration(validatedData);
      
      res.status(201).json({
        message: "Registration successful!",
        registration: {
          id: registration.id,
          name: registration.name,
          email: registration.email,
          submittedAt: registration.submittedAt
        }
      });
    } catch (error) {
      console.error("Registration error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        });
      }
      
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get registration status by email
  app.get("/api/registration-status/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const registration = await storage.getRegistrationByEmail(email);
      
      res.json({
        isRegistered: !!registration,
        registration: registration ? {
          id: registration.id,
          name: registration.name,
          submittedAt: registration.submittedAt
        } : null
      });
    } catch (error) {
      console.error("Status check error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
