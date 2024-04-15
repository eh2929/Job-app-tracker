from flask import Flask
from config import app, db
from models import User, JobApplication, InterviewStage, ApplicationStatus
import random
from datetime import datetime
from models import User
from models import InterviewStage
from models import JobApplication


def seed_db():
    # Create some users
    user1 = User(username="user1")
    user2 = User(username="user2")

    db.session.add(user1)
    db.session.add(user2)
    print("Added users")

    # Create some job applications
    application1 = JobApplication(
        user=user1,
        company="Company A",
        job_title="Job Title A",
        application_date=datetime.strptime("2022-01-01", "%Y-%m-%d"),
        status=ApplicationStatus.APPLIED.name,
        job_description="Job Description A",
        application_deadline=datetime.strptime("2022-01-31", "%Y-%m-%d"),
        salary_offered=50000,
        first_interview_date=datetime.strptime("2022-01-15", "%Y-%m-%d"),
        second_interview_date=datetime.strptime("2022-01-22", "%Y-%m-%d"),
        follow_up_date=datetime.strptime("2022-01-29", "%Y-%m-%d"),
        rejection_date=None,
        ghosting=False,
        current_stage="First Interview",
        cover_letter_provided=True,
        job_source="Online",
        num_interviews=2,
    )

    application2 = JobApplication(
        user=user2,
        company="Company B",
        job_title="Job Title B",
        application_date=datetime.strptime("2022-02-01", "%Y-%m-%d"),
        status=ApplicationStatus.INTERVIEW.name,
        job_description="Job Description B",
        application_deadline=datetime.strptime("2022-02-28", "%Y-%m-%d"),
        salary_offered=60000,
        first_interview_date=datetime.strptime("2022-02-15", "%Y-%m-%d"),
        second_interview_date=None,
        follow_up_date=datetime.strptime("2022-02-22", "%Y-%m-%d"),
        rejection_date=None,
        ghosting=False,
        current_stage="First Interview",
        cover_letter_provided=False,
        job_source="Referral",
        num_interviews=1,
    )

    # Create some interview stages
    stage1 = InterviewStage(
        job_application=application1,
        interview_number=1,
        interview_date=datetime.strptime("2022-01-15", "%Y-%m-%d"),
        interview_type="Phone",
        interviewer="Interviewer A",
        interview_notes="Interview Notes A",
        interview_outcome=True,
    )

    stage2 = InterviewStage(
        job_application=application1,
        interview_number=2,
        interview_date=datetime.strptime("2022-01-22", "%Y-%m-%d"),
        interview_type="In-person",
        interviewer="Interviewer B",
        interview_notes="Interview Notes B",
        interview_outcome=False,
    )

    # Add the data to the session
    db.session.add(application1)
    db.session.add(application2)
    db.session.add(stage1)
    db.session.add(stage2)

    # Commit the session
    db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        seed_db()
    print("Database seeded")
