import styled from "styled-components";

const MainWrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr;

  .pages {
    width: 90vw;
    margin: 0 auto;
  }

  @media (min-width: 992px) {
    grid-template-columns: auto 1fr;
    .pages {
      width: 90%;
    }
  }

  header {
    text-align: center;
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
  .active {
    background: teal;
    color: var(--primary-inverse);
  }
  @media (min-width: 992px) {
    display: block;
    .sidebar {
      min-height: 83vh;
      height: 100%;
      width: 300px;
      margin-left: -250px;
      transition: var(--transition);
    }
    .show-sidebar {
      margin-left: 0;
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
      color: teal;
      border-bottom: 1px solid #1f2d38;
    }
    .nav-link:hover {
      color: var(--primary);
    }
    .active {
      color: var(--contrast);
      background: none;
      padding-left: 3rem;
    }
  }
`;

export { MainWrapper, SideNavWrapper };
