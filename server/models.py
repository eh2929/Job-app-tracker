from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin
from config import db


class User(db.Model, SerializerMixin):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    username = Column(String)
    # relationships
    applications = relationship("JobApplication", backref="user")
    # serialize rules
    serialize_rules = ("-applications.user",)


class JobApplication(db.Model, SerializerMixin):
    __tablename__ = "job_application"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    company = Column(String)
    job_title = Column(String)
    application_date = Column(String)
    status = Column(String)
    job_description = Column(String)
    application_deadline = Column(String)
    salary_offered = Column(Integer)
    first_interview_date = Column(String)
    second_interview_date = Column(String)
    follow_up_date = Column(String)
    rejection_date = Column(String)
    ghosting = Column(Boolean)
    current_stage = Column(String)
    cover_letter_provided = Column(Boolean, default=False, nullable=True)
    job_source = Column(String)
    num_interviews = Column(Integer, default=0, nullable=True)

    # relationships
    stages = relationship("InterviewStage", backref="job_application")

    # serialize rules
    serialize_rules = (
        "-user.applications",
        "-stages.job_application",
    )


class InterviewStage(db.Model, SerializerMixin):
    __tablename__ = "interview_stage"
    id = Column(Integer, primary_key=True)
    job_application_id = Column(Integer, ForeignKey("job_application.id"))
    interview_number = Column(Integer)
    interview_date = Column(String)
    interview_type = Column(String)
    interviewer = Column(String)
    interview_notes = Column(String)
    # relationships
    # serialize rules
    serialize_rules = ("-job_application",)
