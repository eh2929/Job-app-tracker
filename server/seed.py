from flask import Flask
from config import app, db
from models import User, JobApplication, InterviewStage


def seed_db():
    # Create some users
    user1 = User(username="user1")
    user2 = User(username="user2")

    db.session.add(user1)
    db.session.add(user2)
    print("Added users")

    # Create some job applications
    job_application1 = JobApplication(
        user_id=1,
        company="Company1",
        job_title="Developer",
        application_date="2022-01-01",
        status="Applied",
    )
    job_application2 = JobApplication(
        user_id=2,
        company="Company2",
        job_title="Manager",
        application_date="2022-02-01",
        status="Interviewed",
    )

    db.session.add(job_application1)
    db.session.add(job_application2)
    print("Added job applications")

    # Create some interview stages
    interview_stage1 = InterviewStage(
        job_application_id=1,
        interview_number=1,
        interview_date="2022-01-10",
        interview_type="Phone",
        interviewer="Interviewer1",
    )
    interview_stage2 = InterviewStage(
        job_application_id=2,
        interview_number=1,
        interview_date="2022-02-10",
        interview_type="In-person",
        interviewer="Interviewer2",
    )

    db.session.add(interview_stage1)
    db.session.add(interview_stage2)
    print("Added interview stages")

    db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        seed_db()
    print("Database seeded")
