import './Home.css';

function App() {
  return (
    <body>
      <div className="homeContainer">
        <header>
          <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
              <img src="/img/favicon.png" className="headerIcon" alt="logo" />
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Login</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div class="main container">
          <img src="/img/logo.png" className="homeLogo" alt="logo" />
          <h1>Pineapple Supermarket App</h1>
          <h2>Welcome</h2>
        </div>


        <footer>

          <a class="nav-link" href="https://github.com/Pineapple-G13/frontend-pineapple" className="textoGit">GitHub-Team G13</a>
          <p class="fs-6 fw-light" className="textoDev">Developed by Adriana Jimenez, Shel Valdez, Valentina, Vilma Garcia </p>
          <img src="/img/gitIcon.png" className="headerIcon" alt="logo" />
        </footer>
      </div>
    </body>
  );
}

export default App;
