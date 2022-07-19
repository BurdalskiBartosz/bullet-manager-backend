# Backend of Bullet Manager application

Frontend appliaction you can find [here](https://github.com/BurdalskiBartosz/bullet-manager-front).

## Description

An application that I am writing as part of self-development, the assumption of which is to create a system in which users will be able to create accounts together with the choice of a plan. In the basic plan, the application will be a kind of ToDo application, but a bit extensive. In the highest plan, it is supposed to be a project manager like asana or in the future jira.

## Technologies

Some of the technologies used from which the project is created:

* Express.js
* Axios
* Typescript
* prisma
* MySql

## Workflow

The main branch is master (change to develop or main). Each task is one branch, which begins with the main branch, branch names are created according to the formula: project abbreviation/task type/task number from asana, for example BM/feature/1202288889962010.

Based on the currently performed work in the project, each major task should be divided into several smaller tasks so that there is regularity in pull requests.

//TODO add changelog file, CI/CD?, Docker?

## Assumptions to be met by the application

Account creation with in-app plan selection. There are several types of plans, they are:

### Free

Free version of the application. It has the basic functionalities needed to manage daily tasks. It is possible to open a limited number of projects and invite up to 5 other users with an account in the system to each of them. Perfect for people working alone or in a small team on a small project.

#### Specifications

- free plan,
- up to 5 users in the project,
- 5 active projects,
- up to 150 tasks per project,
- 15mb of material warehouse memory,
- 10 days of activity history

### Team

Paid version x PLN per month. It has all the functionalities available in the Free plan, expanded with the possibility of assigning more people to the project. Comparing to the Free plan, all specification parameters are also increased. For medium-sized teams working on more demanding projects.

#### Specifications

- paid plan x PLN / month,
- up to 20 users in the project,
- up to 300 active projects,
- reminders,
- activity history without limits

### Team+

Paid version x PLN per month. It has a Team plan, but in addition, you can assign roles in the project to users, thus granting appropriate permissions.

#### Specifications

- paid plan x PLN / month,
- what is in the Team plan, but additionally the possibility of assigning a role to users in projects

### Enterprise

The version is priced individually, the price is not lower than PLN x per user. It has a new view of projects existing in the organization, dedicated to the plan, including: lists of projects, users, assigning tasks to the user,. In addition, you can create an account for an employee from the panel, while giving him the appropriate role or specific rights. Project manager or admin can create tasks of certain types: regular task, bug, epic. Each type of task has a different workflow specification that can be freely edited or used predefined.

#### Specifications

- plan priced individually, from PLN x per user in the organization,
- view dedicated to the plan,
- creating an account for a user who can simultaneously use the Free plan functionality on his own,
- roles and powers,
- tasks have their types

### Functionalities available to all users

- creating tasks,
- creating notes,
- creating schedules,
- budget,
- body measurements,
- creating lists,
- kanban,
- measuring the time needed to complete the task,
- comments in tasks,
- activity history - depends on the plan,
- habits,
- goals,
- search engine,
- labels,
- calendar,
- materials warehouse - capacity depends on the plan,
- projects,
- counters,
- project planning,
- project view,
- priorities
