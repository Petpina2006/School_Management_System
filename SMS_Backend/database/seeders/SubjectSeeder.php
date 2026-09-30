<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubjectSeeder extends Seeder
{
    public function run(): void
    {
        $subjects = [
            ['Mathematics', 'Study of numbers, algebra, geometry and mathematical concepts.'],
            ['English', 'English language, grammar, reading, writing and communication.'],
            ['Khmer Literature', 'Study of Khmer language, literature, writing and reading.'],
            ['Physics', 'Study of matter, energy, motion, forces and physical phenomena.'],
            ['Chemistry', 'Study of substances, chemical reactions and laboratory science.'],
            ['Biology', 'Study of living organisms, cells, plants, animals and ecosystems.'],
            ['History', 'Study of historical events, civilizations and important people.'],
            ['Geography', 'Study of countries, maps, environment and physical geography.'],
            ['Computer Science', 'Introduction to computers, programming and computer science concepts.'],
            ['Information Technology', 'Study of information technology, systems and digital tools.'],
            ['Web Development', 'HTML, CSS, JavaScript and modern web development.'],
            ['Database Management', 'Database concepts, SQL, relationships and data management.'],
            ['Programming', 'Programming concepts, algorithms, variables and problem solving.'],
            ['Computer Networking', 'Network concepts, devices, protocols and network communication.'],
            ['Software Engineering', 'Software development methods, testing and project management.'],
            ['Data Structures', 'Study of arrays, lists, stacks, queues, trees and algorithms.'],
            ['Algorithms', 'Problem solving and design of efficient computational algorithms.'],
            ['Cyber Security', 'Introduction to computer security, threats and protection methods.'],
            ['Artificial Intelligence', 'Introduction to AI concepts, machine learning and intelligent systems.'],
            ['Robotics', 'Introduction to robotics, sensors, control systems and automation.'],
            ['Economics', 'Basic economic concepts, markets, production and consumption.'],
            ['Accounting', 'Basic accounting principles, financial records and transactions.'],
            ['Business Studies', 'Introduction to business, management and entrepreneurship.'],
            ['Marketing', 'Marketing concepts, customer behavior and promotional strategies.'],
            ['Entrepreneurship', 'Business ideas, planning, innovation and startup fundamentals.'],
            ['Statistics', 'Collection, analysis and interpretation of data.'],
            ['Environmental Science', 'Study of environment, pollution and environmental protection.'],
            ['Earth Science', 'Study of Earth, rocks, minerals and natural processes.'],
            ['Astronomy', 'Study of stars, planets, galaxies and the universe.'],
            ['Health Education', 'Knowledge about health, hygiene, nutrition and healthy living.'],
            ['Physical Education', 'Physical fitness, sports, exercise and healthy activities.'],
            ['Art', 'Drawing, painting, creativity and visual artistic expression.'],
            ['Music', 'Music theory, instruments, performance and appreciation.'],
            ['Social Studies', 'Study of society, communities and social relationships.'],
            ['Civics', 'Study of citizenship, responsibilities and community participation.'],
            ['Ethics', 'Study of moral principles, values and responsible behavior.'],
            ['Psychology', 'Introduction to human behavior, emotions and mental processes.'],
            ['Communication Skills', 'Development of speaking, listening, writing and presentation skills.'],
            ['Public Speaking', 'Techniques for effective presentations and public communication.'],
            ['Research Methods', 'Basic methods for academic research and information analysis.'],
            ['Project Management', 'Planning, organizing and managing academic and practical projects.'],
            ['Mobile App Development', 'Introduction to mobile application design and development.'],
            ['UI/UX Design', 'User interface and user experience design principles.'],
            ['Graphic Design', 'Design principles, typography, graphics and visual communication.'],
            ['Digital Media', 'Creation and management of digital media content.'],
            ['Computer Applications', 'Practical use of common computer software and applications.'],
            ['Office Productivity', 'Word processing, spreadsheets, presentations and office tools.'],
            ['Information Systems', 'Study of systems used to collect, process and manage information.'],
            ['System Analysis', 'Analysis, design and documentation of information systems.'],
            ['System Design', 'Design of software systems, architecture and system components.'],
            ['Operating Systems', 'Study of operating systems, processes, memory and file systems.'],
            ['Computer Architecture', 'Study of computer hardware, processors, memory and system organization.'],
            ['Object-Oriented Programming', 'Programming using classes, objects, inheritance and polymorphism.'],
            ['Java Programming', 'Programming fundamentals and application development using Java.'],
            ['C Programming', 'Programming fundamentals using the C programming language.'],
            ['C++ Programming', 'Object-oriented and general-purpose programming using C++.'],
            ['C# Programming', 'Application development and object-oriented programming using C#.'],
            ['Python Programming', 'Programming fundamentals and application development using Python.'],
            ['PHP Programming', 'Server-side web development using PHP.'],
            ['Laravel Development', 'Web application development using the Laravel framework.'],
            ['React Development', 'Frontend web development using React and modern JavaScript.'],
            ['JavaScript', 'Programming for interactive web applications and frontend development.'],
            ['HTML and CSS', 'Fundamentals of webpage structure and visual styling.'],
            ['SQL', 'Structured Query Language and relational database operations.'],
            ['MySQL Database', 'Database design and management using MySQL.'],
            ['PostgreSQL Database', 'Relational database development using PostgreSQL.'],
            ['Cloud Computing', 'Introduction to cloud services, infrastructure and deployment.'],
            ['AWS Fundamentals', 'Basic Amazon Web Services concepts and cloud infrastructure.'],
            ['DevOps', 'Development, deployment, automation and software operations.'],
            ['Git and GitHub', 'Version control, collaboration and source code management.'],
            ['Software Testing', 'Software testing techniques, test cases and quality assurance.'],
            ['Quality Assurance', 'Software quality processes and quality management.'],
            ['Computer Graphics', 'Computer-generated graphics, images and visualization.'],
            ['Multimedia', 'Integration of text, images, audio, video and animation.'],
            ['Machine Learning', 'Introduction to machine learning concepts and data-driven models.'],
            ['Data Science', 'Data analysis, visualization and basic data science techniques.'],
            ['Big Data', 'Introduction to large-scale data processing and analytics.'],
            ['Internet of Things', 'Connected devices, sensors and IoT communication.'],
            ['Embedded Systems', 'Computer systems designed for dedicated hardware applications.'],
            ['Network Security', 'Security principles for computer networks and communication systems.'],
            ['Web Security', 'Security principles and protection of web applications.'],
            ['Cryptography', 'Encryption, decryption and secure communication concepts.'],
            ['Cloud Security', 'Security concepts for cloud computing environments.'],
            ['E-Commerce', 'Online business, digital transactions and electronic commerce.'],
            ['Digital Marketing', 'Online marketing channels, campaigns and digital strategies.'],
            ['Financial Management', 'Basic financial planning, budgeting and financial decisions.'],
            ['Management', 'Principles of planning, organizing and managing organizations.'],
            ['Leadership', 'Leadership principles, teamwork and decision-making skills.'],
            ['Human Resource Management', 'Employee management, recruitment and organizational development.'],
            ['Business Communication', 'Professional communication in business environments.'],
            ['Professional Ethics', 'Ethical principles and professional responsibilities.'],
            ['Innovation', 'Creative thinking, innovation and development of new ideas.'],
            ['Critical Thinking', 'Problem analysis, reasoning and effective decision making.'],
            ['Problem Solving', 'Techniques for analyzing and solving complex problems.'],
            ['Study Skills', 'Effective learning, note-taking, research and examination techniques.'],
            ['Academic Writing', 'Writing academic reports, essays and research documents.'],
            ['English Communication', 'Practical English communication for academic and professional situations.'],
            ['Advanced Mathematics', 'Advanced mathematical concepts and problem-solving techniques.'],
            ['Applied Physics', 'Application of physics principles to practical situations.'],
            ['Applied Chemistry', 'Practical applications of chemistry in science and industry.'],
            ['General Science', 'Introduction to fundamental concepts in physical and life sciences.'],
        ];

        $data = [];

        foreach ($subjects as $index => $subject) {
            $number = $index + 1;

            $data[] = [
                'subject_code' => 'SUB' . str_pad($number, 3, '0', STR_PAD_LEFT),
                'subject_name' => $subject[0],
                'description' => $subject[1],
                'status' => $number > 95 ? 'inactive' : 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('subjects')->insert($data);
    }
}