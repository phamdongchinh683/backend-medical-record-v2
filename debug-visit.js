const { DataSource } = require("typeorm");
require("dotenv").config();

// Create a simple data source for debugging
const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true, // Enable logging to see SQL queries
  entities: ["src/entities/*.ts"],
});

async function debugVisitQuery() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");

    const visitRepository = AppDataSource.getRepository("Visit");

    // Check total count
    const totalCount = await visitRepository.count();
    console.log("Total visits in database:", totalCount);

    // Get all visits with nft_token
    const allVisits = await visitRepository.find({
      select: ["id", "nft_token", "patient_id", "doctor_id"],
    });
    console.log("All visits:", allVisits);

    // Try to find visit with nft_token = 1
    const visitWithToken1 = await visitRepository.findOne({
      where: { nft_token: 1 },
    });
    console.log("Visit with nft_token = 1:", visitWithToken1);

    // Try with string conversion
    const visitWithToken1String = await visitRepository.findOne({
      where: { nft_token: "1" },
    });
    console.log("Visit with nft_token = '1':", visitWithToken1String);

    // Check the actual column type in the database
    const queryRunner = AppDataSource.createQueryRunner();
    const tableInfo = await queryRunner.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'visits' AND column_name = 'nft_token'
    `);
    console.log("nft_token column info:", tableInfo);

    await queryRunner.release();
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await AppDataSource.destroy();
  }
}

debugVisitQuery();
