# Stage 2: Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy compiled files from builder
COPY --from=builder /app/dist ./dist

# Copy all node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/index.js"]
