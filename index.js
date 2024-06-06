const userInput = document.querySelector("[user-input]");
const profilePic = document.querySelector("[user-image]");
const name = document.querySelector(".username");
const date = document.querySelector(".joined-date");
const userid = document.querySelector("[userid]");
const bio = document.querySelector(".userDesc");
const repos = document.querySelector("[user-repo]");
const followers = document.querySelector("[user_followers]");
const following = document.querySelector("[user-following]");
const address = document.querySelector(".address");
const personalWebsite = document.querySelector("[link]");
const twitter = document.querySelector("[twitter]");
const company = document.querySelector("[company]");
const noUsernameError=document.querySelector(".noUsernameError");

async function getUserInfo(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const userData = await response.json();

        if (response.status === 200) {
            noUsernameError.classList.remove("active");
            
            const userProfilePic = userData.avatar_url;
            const userName = userData.name || userData.login;
            const userDate = new Date(userData.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const userBio = userData.bio;
            const userFollowers = userData.followers;
            const userFollowing = userData.following;
            const userRepos = userData.public_repos;
            const userAddress = userData.location;
            const userWebsite = userData.blog;
            const userCompany = userData.company ? userData.company.replace('@', '') : '';
            const userTwitter = userData.twitter_username;

            // Displaying on the UI
            profilePic.src = userProfilePic;
            name.innerText = userName;
            date.innerText = "Joined " + userDate;
            userid.innerText = "@" + userData.login;
            userid.href = userData.html_url;
            userid.target = "_blank";
            bio.innerText = userBio || "No bio available";
            followers.innerText = userFollowers;
            following.innerText = userFollowing;
            repos.innerText = userRepos;
            address.innerText = userAddress || "Not available";
            personalWebsite.innerText = userWebsite || "Not available";
            personalWebsite.href = userWebsite ? (userWebsite.startsWith('http') ? userWebsite : 'http://' + userWebsite) : "#";
            personalWebsite.target = userWebsite ? "_blank" : "";
            company.innerText = userCompany || "Not available";
            company.href = userCompany ? `https://github.com/${userCompany}` : "#";
            company.target = userCompany ? "_blank" : "";
            twitter.innerText = userTwitter || "Not available";
            twitter.href = userTwitter ? `https://x.com/${userTwitter}` : "#";
            twitter.target = userTwitter ? "_blank" : "";

            
            
        } else {
            console.error("User not found");
            
            noUsernameError.classList.add("active");
            
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

const button = document.querySelector("[search-btn]");
button.addEventListener("click", function (event) {
    event.preventDefault();
    if (userInput.value !== "") {
        getUserInfo(userInput.value);
    }
});

// dark-light mode code
const modeIcon = document.querySelector(".modeChange");
const mainheading = document.querySelector("[main-heading]");
const repoFollowingFollowers = document.querySelector(".repo-following-followers");
const repo = document.querySelector("[repo]");
const userfollowers = document.querySelector("[followers]");
const userfollowing = document.querySelector("[following]");
const form = document.querySelector(".form");
const wrapper = document.querySelector(".wrapper");
const userData = document.querySelector(".user-data");

function changeModeDark(currentMode) {
    currentMode.innerText = "LIGHT";
    modeIcon.classList.remove("fa-moon");
    modeIcon.classList.add("fa-sun");
    mainheading.style.color = "white";
    name.style.color = "white";
    date.style.color = "white";
    repoFollowingFollowers.style.color = "white";
    repo.style.color = "white";
    userfollowing.style.color = "white";
    userfollowers.style.color = "white";
    form.style.backgroundColor = "#1E2A47";
    userData.style.backgroundColor = "#1E2A47";
    userInput.style.color = "white";
    wrapper.style.backgroundColor = "#141D2F";
    currentMode.style.color = "white";
    modeIcon.style.color = "white";
    repoFollowingFollowers.style.backgroundColor = "rgb(16, 32, 52)";


    userInput.style.setProperty('--placeholder-color', 'white');
}

function changeModeLight(currentMode) {
    currentMode.innerText = "DARK";
    modeIcon.classList.remove("fa-sun");
    modeIcon.classList.add("fa-moon");
    mainheading.style.color = "rgb(146, 139, 139)";
    form.style.backgroundColor = "";
    name.style.color = "black";
    date.style.color = "gray";
    repoFollowingFollowers.style.color = "black"; 
    repo.style.color = "black"; 
    userfollowing.style.color = "black"; 
    userfollowers.style.color = "black"; 
    userInput.style.color = "black"; 
    document.documentElement.style.setProperty('--placeholder-color', 'gray');
    userData.style.backgroundColor = "";
    wrapper.style.backgroundColor = "";
    currentMode.style.color = "";
    modeIcon.style.color = "gray";
    repoFollowingFollowers.style.backgroundColor = "";

    userInput.style.setProperty('--placeholder-color', '');
}

const userMode = document.querySelector(".mode");
const currentMode = document.querySelector("[currentMode]");
userMode.addEventListener("click", function () {
    if (currentMode.innerText === "DARK") {
        changeModeDark(currentMode);
    } else {
        changeModeLight(currentMode);
    }
});



getUserInfo("Mradul999");
