import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import envConfig from "./config";
import { DESCRIPTION_JOB_FAKE } from "./constant";

const userFake = async (fastify: FastifyInstance) => {
  const password = await bcrypt.hash(envConfig.PASSWORD_DEFAULT, 10);
  const n = faker.number.int({
    min: envConfig.MIN_DATA,
    max: envConfig.MAX_DATA,
  });
  const { count } = await fastify.prisma.user.createMany({
    data: Array.from({ length: n }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: password,
      address: faker.location.streetAddress(),
      age: faker.number.int({ min: 18, max: 60 }),
      gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),
      created_at: faker.date.recent({ days: 90 }),
      updated_at: faker.date.recent({ days: 90 }),
    })),
  });
  console.log(`${count} users created`);
};

const companyFake = async (fastify: FastifyInstance) => {
  const n = faker.number.int({
    min: envConfig.MIN_DATA,
    max: envConfig.MAX_DATA,
  });
  const { count } = await fastify.prisma.company.createMany({
    data: Array.from({ length: n }, () => ({
      name: faker.company.name(),
      description: faker.helpers.arrayElement(DESCRIPTION_JOB_FAKE),
      address: faker.location.streetAddress(),
      logo: faker.image.urlPicsumPhotos(),
      created_at: faker.date.recent({ days: 90 }),
      updated_at: faker.date.recent({ days: 90 }),
    })),
  });
  console.log(`${count} companies created`);
};

const jobFake = async (fastify: FastifyInstance) => {
  const n = faker.number.int({
    min: envConfig.MIN_DATA,
    max: envConfig.MAX_DATA,
  });
  const companies = await fastify.prisma.company.findMany({
    select: {
      id: true,
    },
  });
  const job = await fastify.prisma.job.createMany({
    data: Array.from({ length: n }, () => ({
      name: faker.company.name(),
      description: faker.helpers.arrayElement(DESCRIPTION_JOB_FAKE),
      location: faker.helpers.arrayElement(["HANOI", "HOCHIMINH", "DANANG"]),
      salary: faker.number.int({ min: 1000000, max: 10000000 }),
      quantity: faker.number.int({ min: 1, max: 10 }),
      level: faker.helpers.arrayElement([
        "INTERN",
        "JUNIOR",
        "SENIOR",
        "FRESHER",
        "MIDDLE",
      ]),
      start_date: faker.date.recent({ days: 90 }),
      end_date: faker.date.future(),
      is_active: true,
      company_id: faker.helpers.arrayElement(companies).id,
      created_at: faker.date.recent({ days: 90 }),
      updated_at: faker.date.recent({ days: 90 }),
    })),
  });
  const jobs = await fastify.prisma.job.findMany({
    select: {
      id: true,
    },
  });
  const [jobSkillCount, jobLevelCount] = await Promise.all([
    fastify.prisma.job_skill.createMany({
      data: Array.from({ length: n }, () => ({
        job_id: faker.helpers.arrayElement(jobs).id,
        skill: faker.helpers.arrayElement([
          "react",
          "nodejs",
          "mongodb",
          "express",
          "typescript",
        ]),
      })),
    }),
    fastify.prisma.job_level.createMany({
      data: Array.from({ length: n }, () => ({
        job_id: faker.helpers.arrayElement(jobs).id,
        level: faker.helpers.arrayElement([
          "INTERN",
          "JUNIOR",
          "SENIOR",
          "FRESHER",
          "MIDDLE",
        ]),
      })),
    }),
  ]);
  console.log(`${jobSkillCount} job skills created`);
  console.log(`${jobLevelCount} job levels created`);
  console.log(`${job.count} jobs created`);
};

const resumeFake = async (fastify: FastifyInstance) => {
  const n = faker.number.int({
    min: envConfig.MIN_DATA,
    max: envConfig.MAX_DATA,
  });
  const [jobs, users] = await Promise.all([
    fastify.prisma.job.findMany({
      include: {
        company: true,
      },
    }),
    fastify.prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    }),
  ]);
  const { count } = await fastify.prisma.resume.createMany({
    data: Array.from({ length: n }, () => {
      const job = faker.helpers.arrayElement(jobs);
      const user = faker.helpers.arrayElement(users);
      return {
        email: user.email,
        status: faker.helpers.arrayElement([
          "PENDING",
          "REJECTED",
          "APPROVED",
          "REVIEWING",
        ]),
        user_id: user.id,
        company_id: job.company_id,
        job_id: job.id,
        url: envConfig.URL_CV_FAKE || faker.image.urlPicsumPhotos(),
        created_at: faker.date.recent({ days: 90 }),
        updated_at: faker.date.recent({ days: 90 }),
      };
    }),
  });
  console.log(`${count} resumes created`);
};

const fakeData = async (fastify: FastifyInstance) => {
  await userFake(fastify);
  await companyFake(fastify);
  await jobFake(fastify);
  await resumeFake(fastify);
};

export default fakeData;
