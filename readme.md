# Hướng dẫn fake data cho bài tập lớn

### Clone repo

```bash
git clone <url repo>
cd fake_data
```

### Cài thư viện

```bash
npm i
```

### Tạo biến môi trường và thay biến môi trường phù hợp

```
cp .env.example .env
```

### Chạy fake data

```bash
npm run start
```

### Câu lệnh copy data fake từ bảng đã tạo trước đóđó

```mysql
INSERT IGNORE INTO <Tên bảng đang dùng trong BTLBTL>.users (id, name, email, password, address, age, gender, created_at, updated_at)
SELECT id, name, email, password, address, age, gender, created_at, updated_at
FROM <Tên bảng đã tạo data fake>.user;

INSERT IGNORE INTO <Tên bảng đang dùng trong BTLBTL>.companies (id, name, description, address, logo, created_at, updated_at)
SELECT id, name, description, address, logo, created_at, updated_at
FROM <Tên bảng đã tạo data fake>.company;

INSERT IGNORE INTO <Tên bảng đang dùng trong BTLBTL>.jobs (id, location, salary, quantity, level, start_date, end_date, is_active, name, description, created_at, updated_at, company_id)
SELECT id, location, salary, quantity, level, start_date, end_date, is_active, name, description, created_at, updated_at, company_id
FROM <Tên bảng đã tạo data fake>.job;

INSERT IGNORE INTO <Tên bảng đang dùng trong BTLBTL>.job_levels (job_id, level)
SELECT job_id, level
FROM <Tên bảng đã tạo data fake>.job_level;

INSERT IGNORE INTO <Tên bảng đang dùng trong BTLBTL>.job_skills (job_id, skill)
SELECT job_id, skill
FROM <Tên bảng đã tạo data fake>.job_skill;

INSERT IGNORE INTO <Tên bảng đang dùng trong BTLBTL>.resumes (id, email, status, user_id, company_id, job_id, url, created_at, updated_at)
SELECT id, email, status, user_id, company_id, job_id, url, created_at, updated_at
FROM fake.resume;
```
