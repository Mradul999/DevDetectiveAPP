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
const twitter=document.querySelector("[twitter]");
const company = document.querySelector("[company]");

async function getUserInfo(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const userData = await response.json();

        if (response.status === 200) {
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
            const userCompany = userData.company;
            const userTwitter=userData.twitter_username;

            // Displaying on the UI
            profilePic.src = userProfilePic;
            name.innerText = userName;
            date.innerText = "Joined "+userDate;
            userid.innerText = "@"+userData.login;
            userid.href = userData.html_url;
            userid.target="_blank";
            bio.innerText = userBio || "No bio available";
            followers.innerText = userFollowers;
            following.innerText = userFollowing;
            repos.innerText = userRepos;
            address.innerText = userAddress || "Not available";
            personalWebsite.innerText = userWebsite || "Not available";
            personalWebsite.href = userData.blog || "#";
            company.innerText = userCompany || "Not available";
            company.href=`https://github.com/${userData.company}`;
            company.target="_blank";
            twitter.innerText=userTwitter||"Not available";
            twitter.href=`https://x.com/${userTwitter}`;
            twitter.target="_blank";
        } else {
            console.error("User not found");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

const button = document.querySelector("[search-btn]");
button.addEventListener("click", function() {
    if (userInput.value !== "") {
        getUserInfo(userInput.value);
    }
});

// Fetch details for 'thepranaygupta' when the app first opens
getUserInfo("thepranaygupta");
