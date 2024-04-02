#!/usr/bin/env python3
from flask import request
from flask_restful import Resource

from config import app, db, api


from models import User, Company, Contact, JobApplication, InterviewStage


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


# users
class UserListResource(Resource):
    def get(self):
        users = User.query.all()
        return [user.to_dict() for user in users], 200

    def post(self):
        new_user = User(username=request.json["username"])
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(), 201


api.add_resource(UserListResource, "/users")


# users by ID
class UserResource(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if user:
            return user.to_dict(), 200
        else:
            return {"error": "User not found"}, 404

    def patch(self, user_id):
        user = User.query.get(user_id)
        if user:
            user.username = request.json.get("username", user.username)
            db.session.commit()
            return user.to_dict(), 200
        else:
            return {"error": "User not found"}, 404

    def delete(self, user_id):
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return {"message": "User deleted"}, 200
        else:
            return {"error": "User not found"}, 404


api.add_resource(UserResource, "/users/<int:user_id>")


# companies
class CompanyListResource(Resource):
    def get(self):
        companies = Company.query.all()
        return [company.to_dict() for company in companies], 200

    def post(self):
        new_company = Company(name=request.json["name"])
        db.session.add(new_company)
        db.session.commit()
        return new_company.to_dict(), 201


api.add_resource(CompanyListResource, "/companies")


# companies by ID
class CompanyResource(Resource):
    def get(self, company_id):
        company = Company.query.get(company_id)
        if company:
            return company.to_dict(), 200
        else:
            return {"error": "Company not found"}, 404

    def patch(self, company_id):
        company = Company.query.get(company_id)
        if company:
            company.name = request.json.get("name", company.name)
            db.session.commit()
            return company.to_dict(), 200
        else:
            return {"error": "Company not found"}, 404

    def delete(self, company_id):
        company = Company.query.get(company_id)
        if company:
            db.session.delete(company)
            db.session.commit()
            return {"message": "Company deleted"}, 200
        else:
            return {"error": "Company not found"}, 404


api.add_resource(CompanyResource, "/companies/<int:company_id>")


# contacts
class ContactListResource(Resource):
    def get(self):
        contacts = Contact.query.all()
        return [contact.to_dict() for contact in contacts], 200

    def post(self):
        new_contact = Contact(
            name=request.json["name"],
            position=request.json["position"],
            email=request.json["email"],
            phone=request.json["phone"],
            company_id=request.json["company_id"],
        )
        db.session.add(new_contact)
        db.session.commit()
        return new_contact.to_dict(), 201


api.add_resource(ContactListResource, "/contacts")


# contacts by ID
class ContactResource(Resource):
    def get(self, contact_id):
        contact = Contact.query.get(contact_id)
        if contact:
            return contact.to_dict(), 200
        else:
            return {"error": "Contact not found"}, 404

    def patch(self, contact_id):
        contact = Contact.query.get(contact_id)
        if contact:
            contact.name = request.json.get("name", contact.name)
            contact.position = request.json.get("position", contact.position)
            contact.email = request.json.get("email", contact.email)
            contact.phone = request.json.get("phone", contact.phone)
            contact.company_id = request.json.get("company_id", contact.company_id)
            db.session.commit()
            return contact.to_dict(), 200
        else:
            return {"error": "Contact not found"}, 404

    def delete(self, contact_id):
        contact = Contact.query.get(contact_id)
        if contact:
            db.session.delete(contact)
            db.session.commit()
            return {"message": "Contact deleted"}, 200
        else:
            return {"error": "Contact not found"}, 404


api.add_resource(ContactResource, "/contacts/<int:contact_id>")


# job applications
class JobApplicationListResource(Resource):
    def get(self):
        applications = (
            db.session.query(JobApplication, Company.name.label("company_name"))
            .outerjoin(
                Company, JobApplication.company_id == Company.id
            )  # Change this line
            .all()
        )

        # Convert the result to a list of dictionaries to be JSON serializable
        applications = [
            {
                **application.JobApplication.to_dict(),  # Serialize the JobApplication data
                "company_name": application.company_name
                or "N/A",  # Add the company name or 'N/A' if it's None
            }
            for application in applications
        ]

        return applications, 200

    def post(self):
        new_application = JobApplication(
            user_id=1,  # Hardcoded user_id
            company_id=request.json.get("company_id"),
            job_title=request.json["job_title"],
            application_date=request.json["application_date"],
            status=request.json.get("status"),
            job_description=request.json.get("job_description"),
            application_deadline=request.json.get("application_deadline"),
            salary_offered=request.json.get("salary_offered"),
            first_interview_date=request.json.get("first_interview_date"),
            second_interview_date=request.json.get("second_interview_date"),
            follow_up_date=request.json.get("follow_up_date"),
            rejection_date=request.json.get("rejection_date"),
            ghosting=request.json.get("ghosting"),
            current_stage=request.json.get("current_stage"),
        )
        db.session.add(new_application)
        db.session.commit()
        print("New job application created: ", new_application.to_dict())
        return new_application.to_dict(), 201


api.add_resource(JobApplicationListResource, "/applications")


# job applications by ID
class JobApplicationResource(Resource):
    def get(self, application_id):
        application = JobApplication.query.get(application_id)
        if application:
            return application.to_dict(), 200
        else:
            return {"error": "Application not found"}, 404

    def patch(self, application_id):
        application = JobApplication.query.get(application_id)
        if application:
            application.user_id = request.json.get("user_id", application.user_id)
            application.company_id = request.json.get(
                "company_id", application.company_id
            )
            application.job_title = request.json.get("job_title", application.job_title)
            application.application_date = request.json.get(
                "application_date", application.application_date
            )
            application.status = request.json.get("status", application.status)
            application.job_description = request.json.get(
                "job_description", application.job_description
            )
            application.application_deadline = request.json.get(
                "application_deadline", application.application_deadline
            )
            application.salary_offered = request.json.get(
                "salary_offered", application.salary_offered
            )
            application.first_interview_date = request.json.get(
                "first_interview_date", application.first_interview_date
            )
            application.second_interview_date = request.json.get(
                "second_interview_date", application.second_interview_date
            )
            application.follow_up_date = request.json.get(
                "follow_up_date", application.follow_up_date
            )
            application.rejection_date = request.json.get(
                "rejection_date", application.rejection_date
            )
            application.ghosting = request.json.get("ghosting", application.ghosting)
            application.current_stage = request.json.get(
                "current_stage", application.current_stage
            )
            db.session.commit()
            return application.to_dict(), 200
        else:
            return {"error": "Application not found"}, 404

    def delete(self, application_id):
        application = JobApplication.query.get(application_id)
        if application:
            db.session.delete(application)
            db.session.commit()
            return {"message": "Application deleted"}, 200
        else:
            return {"error": "Application not found"}, 404


api.add_resource(JobApplicationResource, "/applications/<int:application_id>")


# interview stages
class InterviewStageListResource(Resource):
    def get(self):
        stages = InterviewStage.query.all()
        return [stage.to_dict() for stage in stages], 200

    def post(self):
        new_stage = InterviewStage(
            job_application_id=request.json["job_application_id"],
            stage=request.json["stage"],
            date=request.json["date"],
            notes=request.json["notes"],
            status=request.json["status"],
        )
        db.session.add(new_stage)
        db.session.commit()
        return new_stage.to_dict(), 201


api.add_resource(InterviewStageListResource, "/stages")


# interview stages by ID
class InterviewStageResource(Resource):
    def get(self, stage_id):
        stage = InterviewStage.query.get(stage_id)
        if stage:
            return stage.to_dict(), 200
        else:
            return {"error": "Stage not found"}, 404

    def patch(self, stage_id):
        stage = InterviewStage.query.get(stage_id)
        if stage:
            stage.job_application_id = request.json.get(
                "job_application_id", stage.job_application_id
            )
            stage.stage = request.json.get("stage", stage.stage)
            stage.date = request.json.get("date", stage.date)
            stage.notes = request.json.get("notes", stage.notes)
            stage.status = request.json.get("status", stage.status)
            db.session.commit()
            return stage.to_dict(), 200
        else:
            return {"error": "Stage not found"}, 404

    def delete(self, stage_id):
        stage = InterviewStage.query.get(stage_id)
        if stage:
            db.session.delete(stage)
            db.session.commit()
            return {"message": "Stage deleted"}, 200
        else:
            return {"error": "Stage not found"}, 404


api.add_resource(InterviewStageResource, "/stages/<int:stage_id>")


if __name__ == "__main__":
    app.run(port=5555, debug=True)

# comment
