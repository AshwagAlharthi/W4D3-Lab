let container = document.getElementById("all-blogs-container");
let blogImage = document.getElementById("blogImage");
let title = document.getElementById("title");
let blogContent = document.getElementById("blogContent");
let btn = document.getElementById("btn");
let text = document.getElementById("text");

let homeUserId = localStorage.getItem('homeUserId');

    // if (!homeUserId) {
    //     window.location.href = 'login.html';
    //     return;
    // }

    let homeUserName = document.getElementById("homeUserName");
    let logoutButton = document.getElementById("logoutButton");
    
    
    function fetchingData() {  
        fetch('https://66e7e6c1b17821a9d9da70a4.mockapi.io/login')
            .then((response) => response.json())
            .then((data) => {
                let homeUser = data.find(user => user.id == homeUserId);
                console.log(homeUserId);
                
                if (homeUser) {
                    homeUserName.textContent = homeUser.name;    
        
                } else {
                    console.log('The user not found!');
                    return;
                }
            });
    
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem('homeUserId');
            window.location.href = 'login.html';
        })
    
    }
    
    fetchingData();




btn.addEventListener("click", () => {
    let blogImageValue = blogImage.value;
    let titleValue = title.value;
    let blogContentValue = blogContent.value;

    if (blogImageValue == '' || titleValue == '' || blogContentValue == '') {
        text.textContent = 'Please fill the fields!';
        text.style.color = 'red';
        return;
    }

    fetch('https://66e7e6c1b17821a9d9da70a4.mockapi.io/blogs', {
        method: 'POST',
        body: JSON.stringify({
            image: blogImageValue,
            title: titleValue,
            content: blogContentValue,
            userId: homeUserId
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            blogImage.value = '';
            title.value = '';
            blogContent.value = '';
            text.textContent = `The (${data.title}) blog is added successfully`;
            text.style.color = "black";

            let div = document.createElement("div");
            let image = document.createElement("img");
            let h2Title = document.createElement("h2");
            let pContent = document.createElement("p");
            let deleteButton = document.createElement("button");

            div.classList.add("blog");
            image.classList.add("blog-image");
            deleteButton.classList.add("delButton");

            image.src = blogImageValue;
            h2Title.textContent = titleValue;
            pContent.textContent = blogContentValue;
            deleteButton.textContent = "DELETE";

            div.appendChild(image);
            div.appendChild(h2Title);
            div.appendChild(pContent);
            div.appendChild(deleteButton);
            container.appendChild(div);

        });
});