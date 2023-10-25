import styled from "styled-components";

const MainWrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr;

  .pages {
    width: 90vw;
    margin: 0 auto;
    min-height: 80vh;
  }

  hgroup {
    margin: 0;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    height: 50px;
  }

  p {
    font-size: 0.9rem;
    margin-bottom: 5px;
  }

  @media (min-width: 992px) {
    grid-template-columns: auto 1fr;
    .pages {
      width: 90%;
    }

    input[type="text"],
    input[type="email"],
    input[type="password"] {
      margin: 0;
      height: 50px;
    }

    input[type="file"] {
      margin: 0;
    }

    select {
      height: 50px;
      margin: 0;
      padding: 0 20px;
    }

    p {
      font-size: 0.9rem;
      margin-bottom: 30px;
    }
  }

  header {
    text-align: center;
  }

  .profile-inputs-container {
    display: flex;
    align-items: center;
  }
`;

const SideNavWrapper = styled.aside`
  display: flex;

  .nav-links {
    display: flex;
    flex-direction: row;
  }
  .nav-link {
    display: flex;
    padding: 10px 1rem;
    text-decoration: none;
    transition: 0.3s ease-in-out all;
    color: teal;
  }
  .nav-link:hover {
    color: white;
  }
  .nav-link:focus {
    color: var(--contrast-hover);
  }

  .active {
    background-color: var(--contrast-focus);
    color: var(--contrast-hover);
  }

  @media (min-width: 992px) {
    .sidebar {
      min-height: 83vh;
      width: 250px;
      transition: var(--transition);
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-decoration: none;
      transition: 0.3s ease-in-out all;
    }
    .nav-link:hover {
      color: var(--primary);
    }
    .active {
      background-color: var(--contrast-focus);
      color: var(--contrast-hover);
      padding-left: 3rem;
    }
  }
`;

export { MainWrapper, SideNavWrapper };
