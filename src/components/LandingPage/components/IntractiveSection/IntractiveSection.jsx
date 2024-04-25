import "./IntractiveSection.scss";
import Media from "react-media";

const IntractiveSection = () => {
  return (
    <div className="intractiveSection">
      <div className="intractiveSection-img-container">
        <Media
          queries={{
            large: "(max-width:1240px",
          }}
        ></Media>
        {/* Intractive-Section-Text */}
        <div className="intractiveSection-text">
          <div className="h2"> Who we are ? </div>
          <p>
            EventCrafters, your ultimate solution for unforgettable events. We
            specialize in crafting seamless experiences tailored to your unique
            vision, whether it's a corporate conference, a wedding extravaganza,
            or a community gathering.With our expertise in event planning and
            management, we take care of every detail, from venue selection to
            entertainment, ensuring a stress-free journey for you.
          </p>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default IntractiveSection;
