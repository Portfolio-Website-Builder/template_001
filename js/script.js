const mainContainer = document.querySelector(".portfolio-container");
const navbar = document.querySelector("#navbar");
const logoWrapper = document.querySelector("#logo-wrapper");
const mainContainerWidth = mainContainer.clientWidth;
let originalParent; // Variable to store the original parent of the logoWrapper
let originalIndex; // Variable to store the original index of the logoWrapper

if (mainContainerWidth <= 700) {
  navbar.style.display = "none";
}

function isResponsiveActivated() {
  const mainContainerWidth = mainContainer.clientWidth;
  // const logoWrapper = document.querySelector("#logo-wrapper");

  if (!logoWrapper) {
    return; // Exit if logoWrapper is not found
  }

  // Store the original parent and index if not already done
  if (!originalParent) {
    originalParent = logoWrapper.parentNode;
    originalIndex = Array.prototype.indexOf.call(
      originalParent.children,
      logoWrapper
    );
  }

  if (mainContainerWidth <= 700) {
    // Move logoWrapper to the start of the mainContainer
    if (logoWrapper.parentNode !== mainContainer) {
      mainContainer.prepend(logoWrapper);
    }
    // Responsive activated: logoWrapper moved to the start
  } else {
    // Move logoWrapper back to its original position
    if (originalParent && originalIndex !== undefined) {
      originalParent.insertBefore(
        logoWrapper,
        originalParent.children[originalIndex]
      );
    }
  }
}

function navbarAppearanceChanger() {
  const scrollTop = mainContainer.scrollTop;

  if (scrollTop > 20 && mainContainerWidth <= 700) {
    logoWrapper.style.opacity = "0";
  } else {
    logoWrapper.style.opacity = "1";
  }

  if (mainContainer.scrollTop > 50) {
    navbar.classList.add("navbar-on-scroll");
  } else {
    navbar.classList.remove("navbar-on-scroll");
  }
  console.log(
    scrollTop,
    mainContainer.scrollHeight,
    mainContainer.clientHeight
  );
  if (
    scrollTop > 100 &&
    mainContainerWidth <= 700 &&
    scrollTop < mainContainer.scrollHeight - mainContainer.clientHeight
  ) {
    navbar.style.display = "flex";
  } else {
    navbar.style.display = "none";
  }
}

function makeLogoInvisible() {
  const mainContainerScrollTop = mainContainer.scrollTop;
  const mainContainerWidth = mainContainer.clientWidth;
  console.log(mainContainerScrollTop);
  if (mainContainerScrollTop > 20 && mainContainerWidth <= 700) {
    logoWrapper.style.opacity = "0";
  }
}

const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    isResponsiveActivated();
  }
});

// Start observing the mainContainer
observer.observe(mainContainer);

mainContainer.addEventListener("scroll", navbarAppearanceChanger);
