"""empty message

Revision ID: 8c4224e37978
Revises: 
Create Date: 2024-04-11 10:01:14.506766

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8c4224e37978'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('job_application',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('company', sa.String(), nullable=True),
    sa.Column('job_title', sa.String(), nullable=True),
    sa.Column('application_date', sa.String(), nullable=True),
    sa.Column('status', sa.String(), nullable=True),
    sa.Column('job_description', sa.String(), nullable=True),
    sa.Column('application_deadline', sa.String(), nullable=True),
    sa.Column('salary_offered', sa.Integer(), nullable=True),
    sa.Column('first_interview_date', sa.String(), nullable=True),
    sa.Column('second_interview_date', sa.String(), nullable=True),
    sa.Column('follow_up_date', sa.String(), nullable=True),
    sa.Column('rejection_date', sa.String(), nullable=True),
    sa.Column('ghosting', sa.Boolean(), nullable=True),
    sa.Column('current_stage', sa.String(), nullable=True),
    sa.Column('cover_letter_provided', sa.Boolean(), nullable=True),
    sa.Column('job_source', sa.String(), nullable=True),
    sa.Column('num_interviews', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f('fk_job_application_user_id_user')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('interview_stage',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('job_application_id', sa.Integer(), nullable=True),
    sa.Column('interview_number', sa.Integer(), nullable=True),
    sa.Column('interview_date', sa.String(), nullable=True),
    sa.Column('interview_type', sa.String(), nullable=True),
    sa.Column('interviewer', sa.String(), nullable=True),
    sa.Column('interview_notes', sa.String(), nullable=True),
    sa.Column('interview_outcome', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['job_application_id'], ['job_application.id'], name=op.f('fk_interview_stage_job_application_id_job_application')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('interview_stage')
    op.drop_table('job_application')
    op.drop_table('user')
    # ### end Alembic commands ###
