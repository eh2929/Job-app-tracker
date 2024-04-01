from config import app, db
from models import User, Company, Contact, JobApplication, InterviewStage

with app.app_context():
    # Clear existing data
    db.create_all()
    db.session.query(User).delete()
    db.session.query(Company).delete()
    db.session.query(Contact).delete()
    db.session.query(JobApplication).delete()
    db.session.query(InterviewStage).delete()
    print("Cleared existing data")

    # Create some users
    user1 = User(username="user1")
    user2 = User(username="user2")

    db.session.add(user1)
    db.session.add(user2)
    print("Added users")

    # Create some companies
    company1 = Company(name="Company1")
    company2 = Company(name="Company2")

    db.session.add(company1)
    db.session.add(company2)
    print("Added companies")

    # Create some contacts
    contact1 = Contact(
        name="Contact1",
        position="Manager",
        email="contact1@example.com",
        phone="1234567890",
        company_id=1,
    )
    contact2 = Contact(
        name="Contact2",
        position="HR",
        email="contact2@example.com",
        phone="0987654321",
        company_id=2,
    )

    db.session.add(contact1)
    db.session.add(contact2)
    print("Added contacts")

    # Create some job applications
    job_application1 = JobApplication(
        user_id=1,
        company_id=1,
        job_title="Developer",
        application_date="2022-01-01",
        status="Applied",
    )
    job_application2 = JobApplication(
        user_id=2,
        company_id=2,
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

    # Commit the changes
    db.session.commit()
    print("Committed changes")
