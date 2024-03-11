# Exam Portal

This project is an exam portal which was built to conduct qualifier exams for an Educational Institute. This project is developed using Node.js, express, mongoDB, mongoose and react. The backend is structured as a REST API, which are being consumed in frontend.

## Functionalities
### Admin Section

- **Exam Creation**: Admins can easily create exams with customizable settings, including start time, expiry time, and duration.
- **Question Upload**: Questions can be uploaded using a predefined Excel file, for simplifying the exam setup process.
- **Unique Test Links**: Each exam generated by an admin comes with a unique test link for easy sharing and access.

### User Journey

- **Exam Participation**: Users are prompted to provide essential details like name, email, phone numbers before starting an exam.
- **Auto-Submission**: Exams automatically submit upon timer expiry, if users fails to submit within alloted time.

### Admin Test Submissions

- **Data Analysis**: Admins can view detailed submission data, including user information and scores in tabular format.
- **Export Functionality**: Submission data can be exported to Excel for further analysis or sharing.

## Deployment

The project was initiated in April 2021 and completed within one month to meet the urgent requirements of Nagarjuna College for the upcoming the admission season. It was hosted during may to august of 2021, 2022, 2023 on an AWS EC2 instance, conducted over 25 exams with 500+ student participants.

## UI and Complexity

While the UI may appear simple, it packs major functionalities to meet the requirements of exam management. Despite its simplicity, the application offers a minimal user experience and efficient exam administration.

## Video Showcase

To see the features of the project in action, check out the demonstration [here](https://drive.google.com/file/d/1PV2IaoLDa2hmT_ovR0diUk2IvkeI4JVY/view?usp=sharing). Please be aware that this demonstration showcases a replica of the website not the actual website, as the original application is no longer available. Also the demo is in timelapse mode so consider slowing down the playback speed for better understanding.
