const GITHUB_URL = 'https://api.github.com/users/';
const imageTag = document.getElementById('avatar');

// data for job experience
const jobData = {
    "job1": {
        "title": "Mainframe Engineer Co-op",
        "subtitle": "September 2025 - Present",
        "image": "./images/MainframeALT.png",
        "description": [
            "In the process of learning and contributing to the mainframe development at CIBC. Gaining hands-on experience with <span class=\"font-bold\">COBOL</span>, <span class=\"font-bold\">JCL</span>, and other mainframe technologies while collaborating with a team of experienced professionals.",
            "Currently working on automation scripts to streamline deployment processes and improve system efficiency.",
            "Completed <span class=\"font-bold\">IBM Z Xplore</span> program, gaining valuable skills in mainframe technologies and cloud computing."
        ]
    },
    "job2": {
        "title": "IT Project Coordinator Co-op",
        "subtitle": "May 2025 - August 2025",
        "image": "./images/City.JPG",
        "description": [
            "Assisted in the management of <span class=\"font-bold\">500+</span> company wide IT projects, ensuring timely delivery and adherence to project scope.",
            "Created automation workflows using <span class=\"font-bold\">Power Automate</span> to streamline project management processes, resulting in improved efficiency and reduced manual effort.",
            "Collaborated with cross-functional teams to gather requirements, connect teams with resources, and facilitate communication between project managers."
        ]
    },
    "project1": {
        "title": "Flash.AI",
        "subtitle": "React, MongoDB, Node.JS, TailwindCSS",
        "date": "February 2025",
        "image": "./images/Flash.png",
        "description": [
            "Collaborated with a team at Hackhive 2025, achieving <span class=\"font-bold\">2nd place out of 86 teams</span>, ranking in the top <span class=\"font-bold\">2.3%</span> of participants.",
            "Developed AI solutions that generated quizzes with a 90% accuracy rate, allowing users to create quizzes from documents in less than <span class=\"font-bold\">10 seconds</span>.",
            "Implemented a user-friendly interface using <span class=\"font-bold\">React</span> and <span class=\"font-bold\">TailwindCSS</span>, ensuring a seamless user experience across devices."
        ],
        "link": "https://github.com/Macpickle/Flash.AI"
    },
    "project2": {
        "title": "Web Browser",
        "subtitle": "Python, Tkinter, SSL, Websockets",
        "date": "November 2024",
        "image": "./images/Browser.png",
        "description": [
            "Developed a web browser using HTML, CSS, and JavaScript, implementing features such as tabbed browsing, bookmarks, and a history manager.",
            "Utilized modern web technologies and best practices to ensure a responsive and user-friendly interface.",
            "Conducted thorough testing and debugging to ensure cross-browser compatibility and performance optimization."
        ],
        "link": "https://github.com/Macpickle/Web-Browser"
    },
    "project3": {
        "title": "Chatroom + AI Chatbot",
        "subtitle": "React, Node.js, Express, HTML/CSS, Google Generative AI",
        "image": "./images/Chatroom.png",
        "date": "July 2024",
        "description": [
            "Developed a real-time chatroom application using WebSocket, allowing users to communicate seamlessly.",
            "Integrated an AI chatbot powered by natural language processing to assist users in finding information.",
            "Implemented user authentication and authorization to ensure secure access to the chatroom."
        ],
        "link": "https://github.com/Macpickle/Chatroom-REACT"
    }
};

getUser("Macpickle")

// fetches user data from GitHub API and sets avatar image
function getUser(username) {
    fetch(GITHUB_URL + username)
        .then(response => response.json())
        .then(data => {
            imageTag.setAttribute('src', data.avatar_url);
        })
        .catch(error => console.error('Error:', error));
}

// dynamically create project buttons
const projectList = document.getElementById('project-list');
Object.keys(jobData).forEach(key => {
    if (key.startsWith('project')) {
        const project = jobData[key];
        const button = document.createElement('button');
        button.id = key;
        button.type = "button";
        button.innerHTML = project.title;
        // Use a custom button template for projects
        button.className = "flex flex-row px-4 py-2 gap-x-4 hover:scale-102 hover:bg-[var(--foreground-hover)] duration-300 ease-in-out rounded-lg selectable-elm";
        button.innerHTML = `
            <div class="flex flex-col flex-1 items-start">
            <h3 class="text-lg text-[var(--primary-text)] font-bold ">${project.title}</h3>
            <div class="flex justify-between w-full">
                <p class="text-sm text-[var(--secondary-text)] font-thin text-left">${project.subtitle}</p>
                <p class="text-sm text-[var(--secondary-text)] font-thin text-right whitespace-nowrap">${project.date || ""}</p>
            </div> 
            </div>
        `;
        projectList.appendChild(button);
    }
});

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {        
        // set state of all buttons to not selected
        document.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // update job info based on button clicked
        const jobInfo = jobData[button.id];
        document.getElementById('info-image').setAttribute('src', jobInfo.image);
        document.getElementById('info-image').setAttribute('alt', jobInfo.title);
        document.getElementById('info-image').classList.remove('h-48', 'h-64');
        document.getElementById('info-title').innerHTML = jobInfo.title;
        document.getElementById('info-subtitle').innerHTML = jobInfo.subtitle;

        // update list item
        const descriptionList = document.getElementById('info-description');
        descriptionList.innerHTML = '';
        jobInfo.description.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = item;
            descriptionList.appendChild(li);
        });

        const infoLink = document.getElementById("info-link");

        if (button.id.startsWith('job')) {
            document.getElementById('info-image').classList.add('h-48');
            infoLink.href = "";
            infoLink.innerHTML = "";
            document.getElementById('info-maintitle').innerHTML = "Work Experience";

        } else if (button.id.startsWith('project')) {
            document.getElementById('info-image').classList.add('h-64');
            infoLink.href = jobInfo.link;
            infoLink.innerHTML = "github.com";
            document.getElementById('info-maintitle').innerHTML = "Projects";
        }

        // reset animation
        const infoBox = document.getElementById('info-box');
        infoBox.classList.remove('fade-in');

        void infoBox.offsetWidth;
        infoBox.classList.add('fade-in');
        
        document.getElementById('info-box').classList.add('fade-in');
        document.getElementById('info-box').scrollIntoView();
    });
});

// simulate button click on nav link click
document.querySelectorAll('#nav').forEach(link => {
    link.addEventListener('click', () => {
        const linkText = link.textContent.trim().toLowerCase();

        if (linkText === 'experience') {
            document.getElementById('job1').click();
        } else if (linkText === 'projects') {
            document.getElementById('project1').click();
        }
    });
});