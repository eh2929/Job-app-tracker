#!/usr/bin/env python3
from flask import request
from flask_restful import Resource

from config import app, db, api


from models import User, JobApplication, InterviewStage


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


# job applications
class JobApplicationListResource(Resource):
    def get(self):
        # Get query parameters for filtering
        company = request.args.get("company")
        job_title = request.args.get("job_title")
        status = request.args.get("status")
        min_salary = request.args.get("min_salary")
        max_salary = request.args.get("max_salary")
        has_interview = request.args.get("has_interview")
        has_rejection = request.args.get("has_rejection")
        has_ghosting = request.args.get("has_ghosting")
        cover_letter_provided = request.args.get("cover_letter_provided")
        job_source = request.args.get("job_source")

        # Query job applications
        applications_query = JobApplication.query

        # Apply filters
        if company:
            applications_query = applications_query.filter(
                JobApplication.company.ilike(f"%{company}%")
            )
        if job_title:
            applications_query = applications_query.filter(
                JobApplication.job_title.ilike(f"%{job_title}%")
            )
        if status:
            applications_query = applications_query.filter(
                JobApplication.status == status
            )
        if min_salary:
            applications_query = applications_query.filter(
                JobApplication.salary_offered >= min_salary
            )
        if max_salary:
            applications_query = applications_query.filter(
                JobApplication.salary_offered <= max_salary
            )
        if has_interview:
            applications_query = applications_query.filter(
                JobApplication.num_interviews > 0
            )
        if has_rejection:
            applications_query = applications_query.filter(
                JobApplication.status == "Rejected"
            )
        if has_ghosting:
            applications_query = applications_query.filter(
                JobApplication.ghosting == True
            )
        if cover_letter_provided:
            applications_query = applications_query.filter(
                JobApplication.cover_letter_provided == True
            )
        if job_source:
            applications_query = applications_query.filter(
                JobApplication.job_source == job_source
            )

        # Execute the query and return results
        applications = applications_query.all()
        return [application.to_dict() for application in applications], 200

    def post(self):
        new_application = JobApplication(
            user_id=request.json.get("user_id"),
            company=request.json.get("company"),
            job_title=request.json.get("job_title"),
            application_date=request.json.get("application_date"),
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
            cover_letter_provided=request.json.get("cover_letter_provided"),
            job_source=request.json.get("job_source"),
            num_interviews=request.json.get("num_interviews"),
        )
        db.session.add(new_application)
        db.session.commit()
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
            application.job_title = request.json.get("job_title", application.job_title)
            application.company = request.json.get("company", application.company)
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
            application.cover_letter_provided = request.json.get(
                "cover_letter_provided", application.cover_letter_provided
            )
            application.job_source = request.json.get(
                "job_source", application.job_source
            )
            application.num_interviews = request.json.get(
                "num_interviews", application.num_interviews
            )
            db.session.commit()
            return application.to_dict(), 200

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
            interview_number=request.json["interview_number"],
            interview_date=request.json["interview_date"],
            interview_type=request.json["interview_type"],
            interviewer=request.json["interviewer"],
            interview_notes=request.json["interview_notes"],
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
            stage.interview_number = request.json.get(
                "interview_number", stage.interview_number
            )
            stage.interview_date = request.json.get(
                "interview_date", stage.interview_date
            )
            stage.interview_type = request.json.get(
                "interview_type", stage.interview_type
            )
            stage.interviewer = request.json.get("interviewer", stage.interviewer)
            stage.interview_notes = request.json.get(
                "interview_notes", stage.interview_notes
            )
            db.session.commit()

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
