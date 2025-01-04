const inputElement = document.querySelector('.username')
const searchBtn = document.querySelector('.btn');
const container = document.querySelector('.profile-info');
const mainDiv = document.querySelector('.main-div')

searchBtn.addEventListener('click', e => {
    e.preventDefault();
    let input = inputElement.value;
    let username = input;

    (username === '')?alert('Enter Username'):fetchApi(username);
})

async function fetchApi(username){
    
    try{
        let response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error('User not found');
        }
        else{
            let data = await response.json();
            console.log(data);
                let inner = `<div class="row1">
                        <img class="profile-img" src="${data.avatar_url}" alt="profile image">
                        <div class="reach-container">
                            <div class="reach">
                                <div class="followers style">
                                    <p href="${data.followers_url}" target="_blank" class="reach-text">Followers</p>
                                    <p class="reach-number">${data.followers}</p>
                                </div>
                                <div class="following style">
                                    <p  href="${data.following_url}" target="_blank" class="reach-text">Following</p>
                                    <p class="reach-number">${data.following}</p>
                                </div>
                                <div class="repo style">
                                    <p href="${data.repos_url}" target="_blank" class="reach-text">Repository</p>
                                    <p class="reach-number">${data.public_repos}</p>
                                </div>
                            </div>
                            <a href="${data.html_url}" target="_blank" class="view-btn">View Profile</a>
                        </div>
                    </div>
                <div class="row2">
                        <h2>${data.name}</h2>
                        <div class="degree">${data.bio}</div>
                </div>`
                container.classList.remove('hidden', 'show-error');
                mainDiv.classList.add('border');
                container.innerHTML = inner;
        
        }
    }catch(err){
        container.classList.remove('hidden');
        mainDiv.classList.add('show-error');

        const errorHTML = `<h1 class="not-found">User Not Found!</h1>`;
        container.innerHTML = errorHTML;
    }
}