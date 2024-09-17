function homeData() {
    let homeUserName = document.getElementById("homeUserName");
    let logoutButton = document.getElementById("logoutButton");

    let homeUserId = localStorage.getItem('homeUserId');

    if (!homeUserId) {
        window.location.href = 'login.html';
        return;
    }

    fetch('https://66e7e6c1b17821a9d9da70a4.mockapi.io/login')
        .then((response) => response.json())
        .then((data) => {
            let homeUser = data.find(user => user.id == homeUserId);

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

homeData();

function fetchingBlogs() {
    fetch('https://66e7e6c1b17821a9d9da70a4.mockapi.io/blogs')
        .then((response) => response.json())
        .then((data) => {
            data.map(blog => {
                console.log(blog);
                let container = document.getElementById("all-blogs-container")
                let div = document.createElement("div");
                let image = document.createElement("img");
                let h2Title = document.createElement("h2");
                let pContent = document.createElement("p");
                let deleteButton = document.createElement("button");

                div.classList.add("blog");
                image.classList.add("blog-image");
                deleteButton.classList.add("delButton");


                image.src = blog.image;
                h2Title.textContent = blog.title;
                pContent.textContent = blog.content;
                deleteButton.textContent = "DELETE";

                div.appendChild(image);
                div.appendChild(h2Title);
                div.appendChild(pContent);
                div.appendChild(deleteButton);
                container.appendChild(div);
                deleteButton.addEventListener("click", () => {
                    fetch(`https://66e7e6c1b17821a9d9da70a4.mockapi.io/blogs/${blog.id}`, {
                        method: 'DELETE',
                    })
                        .then(response => {
                            if (response.ok) {
                                div.remove();
                            };
                        })
                })
            });
        });
}

fetchingBlogs();