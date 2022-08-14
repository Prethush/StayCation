import heroBg from "../assets/images/home_hero_bg.jpg";
import "./HomeHeroSection.css";

function HomeHeroSection() {
  return (
    <div style={{ height: "92vh" }}>
      <div
        className="bg-primary position-relative"
        style={{
          height: "100%",
          backgroundImage: `url(${heroBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
        }}
      >
        <div className="position-absolute top-50 start-50 translate-middle text-danger">
          <form action="" className="d-flex flex-column flex-lg-row">
            <fieldset>
              <input
                type="text"
                className="p-3 border border-1 input-elm"
                placeholder="Search by city"
              />
            </fieldset>
            <fieldset>
              <input type="date" className="p-3 border border-1 input-elm" />
            </fieldset>
            <fieldset>
              <input type="date" className="p-3 border border-1 input-elm" />
            </fieldset>
            <fieldset className="d-flex flex-column flex-lg-row">
              <input
                type="number"
                className="p-3 border border-1 input-elm"
                placeholder="Rooms"
              />
              <input
                type="text"
                className="p-3 rounded-end border border-1 input-elm"
                placeholder="2 Adult, 1 Children"
              />
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomeHeroSection;
