/*
const track = document.getElementById("image-track")

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}
window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}
window.onmousemove = e => {

    if(track.dataset.mouseDownAt ==="0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentage = Math.max(Math.min(parseFloat(track.dataset.prevPercentage) + percentage, 0), -100);
        //parseFloat(track.dataset.prevPercentage) + percentage;

    track.dataset.percentage = nextPercentage;

    //track.style.transform = `translate(${nextPercentage}%, -50%)`;
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, {duration: 1200, fill: "forwards"});

    for(const image of track.getElementsByClassName("image")){
        //image.style.objectPosition = `${nextPercentage + 100} 50%`;
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, {duration: 1200, fill: "forwards"});
    }
}

// For scroll
document.querySelector('a[href="#about"]').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor behavior

    // Scroll to the "about" section with smooth animation
    document.querySelector('#about').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
});

// FOR Active Nav Page
const navLinks = document.querySelectorAll('nav ul li a');

// Add 'active' class to the clicked link and remove it from others
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
    });
});

const images = document.querySelectorAll("#image-track .image");
const nav = document.querySelector("nav");
let segment; // Variable to store the active segment

// Add click event to each image
images.forEach((image) => {
    image.addEventListener("click", () => {
        // Blur and hide the image track
        const imageTrack = document.getElementById("image-track");
        imageTrack.classList.add("blurred", "hidden");

        // Create a new segment
        segment = document.createElement("div");
        segment.classList.add("image-segment"); // Add a class for styling

        // Set the background image for the segment
        segment.style.backgroundImage = `url(${image.src})`;

        // Minimize all images (including the clicked one)
        images.forEach((img) => {
            const minimizedImage = img.cloneNode(true);
            minimizedImage.classList.add("minimized-image"); // Add a class for styling
            minimizedImage.addEventListener("click", () => {
                // Re-trigger click to create a new segment
                removeSegment();
                img.click();
            });
            segment.appendChild(minimizedImage);
        });

        // Add scroll wheel event to exit the segment
        window.addEventListener("wheel", removeSegment);

        // Append the segment to the body
        document.body.appendChild(segment);
    });
});

const removeSegment = () => {
    if (segment) {
        const imageTrack = document.getElementById("image-track");

        // Restore the image track
        imageTrack.classList.remove("blurred", "hidden");

        // Remove the segment
        document.body.removeChild(segment);
        segment = null;
    }
};

*/

/*NEW JS*/
const track = document.getElementById("image-track");
let isDragging = false; // Flag to determine if the user is dragging

window.onmousedown = (e) => {
    track.dataset.mouseDownAt = e.clientX;
    isDragging = false; // Reset dragging state
};

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;

    // Allow clicking if not dragging
    setTimeout(() => (isDragging = false), 50); // Small delay to reset
};

window.onmousemove = (e) => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentage = Math.max(
        Math.min(parseFloat(track.dataset.prevPercentage) + percentage, 0),
        -100
    );

    track.dataset.percentage = nextPercentage;

    // Check if movement qualifies as dragging
    if (Math.abs(mouseDelta) > 5) {
        isDragging = true; // Mark as dragging if movement exceeds threshold
    }

    track.animate(
        {
            transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1200, fill: "forwards" }
    );

    for (const image of track.getElementsByClassName("image")) {
        image.animate(
            {
                objectPosition: `${100 + nextPercentage}% center`,
            },
            { duration: 1200, fill: "forwards" }
        );
    }
};
// For scroll
document.querySelector('a[href="#about"]').addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default anchor behavior

    // Scroll to the "about" section with smooth animation
    document.querySelector("#about").scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
});
// FOR Active Nav Page
const navLinks = document.querySelectorAll("nav ul li a");

// Add 'active' class to the clicked link and remove it from others
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.forEach((nav) => nav.classList.remove("active"));
        link.classList.add("active");
    });
});

const images = document.querySelectorAll("#image-track .image");
const nav = document.querySelector("nav");
let segment; // Variable to store the active segment

// Add click event to each image
images.forEach((image) => {
    image.addEventListener("click", () => {
        if (isDragging) return; // Prevent click if dragging

        // Blur and hide the image track
        const imageTrack = document.getElementById("image-track");
        imageTrack.classList.add("blurred", "hidden");

        // Create a new segment
        segment = document.createElement("div");
        segment.classList.add("image-segment"); // Add a class for styling

        // Set the background image for the segment
        segment.style.backgroundImage = `url(${image.src})`;

        // Minimize all images (including the clicked one)
        images.forEach((img) => {
            const minimizedImage = img.cloneNode(true);
            minimizedImage.classList.add("minimized-image"); // Add a class for styling
            minimizedImage.addEventListener("click", () => {
                // Re-trigger click to create a new segment
                removeSegment();
                img.click();
            });
            segment.appendChild(minimizedImage);
        });

        // Add scroll wheel event to exit the segment
        window.addEventListener("wheel", removeSegment);

        // Append the segment to the body
        document.body.appendChild(segment);
    });
});

const removeSegment = () => {
    if (segment) {
        const imageTrack = document.getElementById("image-track");

        // Restore the image track
        imageTrack.classList.remove("blurred", "hidden");

        // Remove the segment
        document.body.removeChild(segment);
        segment = null;
    }
};

/*document.querySelector('a[href="#about"]').addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default anchor behavior

    // Scroll to the "about" section with smooth animation
    document.querySelector("#about").scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
});*/
// Handle "about" link click
document.querySelector('a[href="#about"]').addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default anchor behavior

// Adjust the segment to stop interfering with scrolling
    if (segment) {
        segment.style.height = `calc(100vh - ${nav.offsetHeight}px)`; // Adjust height
        segment.style.position = "absolute"; // Change to absolute to respect page flow
        
    }

    // Scroll to the "about" section with smooth animation
    document.querySelector("#about").scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
});
