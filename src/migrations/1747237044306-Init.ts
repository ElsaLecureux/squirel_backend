import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1747237044306 implements MigrationInterface {
  name = 'Init1747237044306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "user" (
            "id" SERIAL PRIMARY KEY, 
            "username" varchar NOT NULL UNIQUE,
            "email" varchar NOT NULL UNIQUE, 
            "password" varchar NOT NULL, 
            "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), 
            "updated_at" TIMESTAMP NOT NULL DEFAULT NOW())`);
    await queryRunner.query(`
        CREATE TABLE "card" (
            "id" SERIAL PRIMARY KEY, 
            "name" varchar NOT NULL, 
            "funFact" varchar NOT NULL, 
            "habitat" varchar NOT NULL, 
            "region" varchar NOT NULL, 
            "size" varchar NOT NULL, 
            "weight" varchar NOT NULL, 
            "speed" varchar NOT NULL, 
            "food" varchar NOT NULL, 
            "endangered" boolean NOT NULL, 
            "icon" integer NULL, 
            "image" integer NULL)`);
    await queryRunner.query(`
        CREATE TABLE "game" ("id" SERIAL PRIMARY KEY, "name" varchar(25) NOT NULL, "avatar" OID NULL, "avatarGold" OID NULL)`);
    await queryRunner.query(`
        CREATE TABLE "user_play_game" (
            "id" SERIAL PRIMARY KEY, 
            "numberOfTimeWon" integer NOT NULL, 
            "userId" integer, 
            "gameId" integer, 
            CONSTRAINT "FK_user" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE, 
            CONSTRAINT "FK_game" FOREIGN KEY ("gameId") REFERENCES "game" ("id") ON DELETE CASCADE)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "user_play_game" DROP CONSTRAINT "FK_user_play_game_game"`);
    await queryRunner.query(`
        ALTER TABLE "user_play_game" DROP CONSTRAINT "FK_user_play_game_user"`);
    await queryRunner.query(`DROP TABLE "user_play_game"`);
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(`DROP TABLE "game"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
