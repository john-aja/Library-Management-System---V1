# Library Management Web Application

Welcome to the Library Management Web Application! This application allows users to manage a library by viewing and interacting with books, marking them as taken, and voting for books that are not available in the physical library. Administrators have additional privileges such as adding and removing books, as well as accessing user details.

*This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.3.*

## Technologies Used

The Library Management Web Application is built using the following technologies:

- ***Angular:*** A popular JavaScript framework for building web applications.
  
- ***Tailwind CSS:*** A utility-first CSS framework for quickly styling web interfaces.
  
- ***Firebase Storage:*** A cloud storage service provided by Google, used for storing book-related assets.

- ***Firebase Realtime Database:*** A NoSQL database provided by Google, used for storing book and user data.
  
- ***Google One Tap Sign-In:*** A simple and secure sign-in method provided by Google, used for user authentication.

## Features

The Library Management Web Application offers the following features:

- ***Library Section:*** Users can view a list of all books, including those not physically available in the library.

- ***Available Books Section:*** Users can see the books currently available in the physical library. They can mark a book as taken if they borrow it.

- ***Vote Book:*** Users can vote for books that are not available in the physical library. Voted books are added to the user's voted books section.

- ***Admin Privileges:*** Administrators have additional privileges, including adding and removing books, as well as accessing user details and voting activity.

- ***Google One Tap Sign-In:*** Users can sign in using their Google credentials. The application verifies whether the user is an admin or a regular user based on their sign-in credentials.

## Usage

To use the Library Management Web Application, follow these steps:

1. Access the application using the provided URL.
   *Application URL: https://library-management-system-lms.el.r.appspot.com*
   
2. Sign in using your Google credentials.
 
3. Depending on your user type (admin or regular user), you will have different access and privileges.
 
4. Explore the library section to view all books, including those not available in the physical library.
 
5. In the available books section, mark a book as taken if you borrow it from the physical library.
 
6. If you come across a book in the library section that is not available physically, you can vote for it using the "Vote Book" button.

7. Administrators can access additional features such as adding and removing books, as well as viewing user details and voting activity.

## Installation

*To install and run the Library Management Web Application locally, follow these steps:*

1. Clone the repository to your local machine using the following command:

    ![#1589F0](https://www.iconsdb.com/icons/download/color/1589F0/circle-16.png) git clone https://github.com/john-aja/Library-Management-System---V1.git

2. Navigate to the project directory:

    ![#1589F0](https://www.iconsdb.com/icons/download/color/1589F0/circle-16.png) cd lms-portal-v

3. Install the necessary dependencies:

    ![#1589F0](https://www.iconsdb.com/icons/download/color/1589F0/circle-16.png) npm install

4. Start the application:

    ![#1589F0](https://www.iconsdb.com/icons/download/color/1589F0/circle-16.png) ng serve --port=4000

   *Open your web browser and visit http://localhost:4000 to access the application.*

## Configuration

To configure the Library Management Web Application, you will need to provide the necessary credentials and settings for the technologies used. Follow these steps:

- Configure the Firebase project and obtain the required API keys and credentials.
  
- Set up the Firebase Storage and Realtime Database for storing book and user data.

- Enable Google One Tap Sign-In and configure the necessary OAuth credentials.

- Update the application configuration files with the appropriate API keys, database URLs, and authentication settings.

## Admin Privileges

Administrators have additional privileges compared to regular users. The admin features include:

- ***Add Book***: Administrators can add new books to the library, including book details and assets.
  
- ***Remove Book***: Administrators can remove books from the library.
  
- ***User Details***: Administrators can access user details, including information about which books users have taken and the books they have voted for.
  
- ***Voting Activity***: Administrators can view the voting activity, including the books that have been voted for and the number of votes each book has received.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Contact

For any inquiries or support regarding the Scheme Welfare Web Application, please contact:

Your Name : ***John***
Email: ***janakiram.0695@gmail.com***

Feel free to reach out with any questions, feedback, or suggestions. Your input is highly appreciated!
