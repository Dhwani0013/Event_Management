import "./GallarySection.scss";
import Media from "react-media";
const gallaryObj = [
  {
    id: 1,
    ImageAddress:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWue4p9ML6_QwQfZQ_W5LJCpfi9qae8qPePg&s",
    ImageAddressMobile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWue4p9ML6_QwQfZQ_W5LJCpfi9qae8qPePg&s",
    ImageName: " Night Party",
    description: `Get ready to dance the night away at our vibrant party event! From themed soirées to glamorous galas, we've got everything you need for an unforgettable celebration. Join us for an electrifying atmosphere, delicious refreshments, and memories that will last a lifetime!`,
  },
  {
    id: 2,
    ImageAddress:
      "https://images.pexels.com/photos/19458712/pexels-photo-19458712/free-photo-of-young-woman-throwing-confetti-between-birthday-decorations.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ImageAddressMobile:
      "https://images.pexels.com/photos/19458712/pexels-photo-19458712/free-photo-of-young-woman-throwing-confetti-between-birthday-decorations.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ImageName: "Birthday",
    description: `Join us as we organize the perfect celebration! With meticulous planning and attention to detail, we ensure every moment of your event is seamless and unforgettable. Let us take the stress out of organizing so you can focus on enjoying every minute of your special occasion. Trust us to make your event a resounding success!`,
  },
  {
    id: 3,
    ImageAddress:
      "https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ImageAddressMobile:
      "https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ImageName: "Music Concert",
    description: `Experience the magic of live music at our electrifying concert event! Get ready to be swept away by unforgettable performances, pulsating rhythms, and soul-stirring melodies. Join us for an evening filled with energy, excitement, and a symphony of sounds. Don't miss out on the concert of a lifetime`,
  },
  {
    id: 4,
    ImageAddress:
      "https://images.pexels.com/photos/2155544/pexels-photo-2155544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ImageAddressMobile:
      "https://images.pexels.com/photos/2155544/pexels-photo-2155544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ImageName: "Exhibition",
    description: `Step into a world of creativity and innovation at our extraordinary exhibition! Explore captivating displays, interact with groundbreaking ideas, and immerse yourself in a realm of inspiration. Join us for an event that showcases the very best in art, technology, and design. Get ready to be amazed at our exhibition extravaganza!`,
  },
  {
    id: 5,
    ImageAddress:
      "https://images.pexels.com/photos/13426981/pexels-photo-13426981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ImageAddressMobile:
      "https://images.pexels.com/photos/13426981/pexels-photo-13426981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ImageName: "Festival",
    description: `Get ready to splash into color and joy at our vibrant Holi event! Join us for a celebration filled with laughter, music, and the spirit of togetherness. Embrace the festive atmosphere as you indulge in traditional delicacies, dance to lively beats, and experience the magic of Holi. Let's create unforgettable memories as we celebrate the triumph of love and unity at our Holi extravaganza`,
  },
  {
    id: 6,
    ImageAddress:
      "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ImageAddressMobile:
      "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ImageName: "Wedding",
    description: `Celebrate the union of hearts at our enchanting marriage event! Join us as we weave together love, tradition, and joy to create a day you'll cherish forever. From the breathtaking ceremony to the unforgettable reception, every moment is meticulously planned to perfection. Let us be your partner in creating the fairy tale wedding of your dreams!`,
  },
  {
    id: 7,
    ImageAddress:
      "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ImageAddressMobile:
      "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ImageName: "College Events",
    description: `Dive into a world of creativity and excitement at our dynamic collage events! Join us for an eclectic mix of performances, exhibitions, and activities that showcase the diverse talents and passions of our community. From art showcases to cultural performances, there's something for everyone to enjoy. Let's come together and celebrate the vibrant tapestry of our collage events!`,
  },
  {
    id: 8,
    ImageAddress:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7vKeWxBITWdVQnCj-OpUUshej7ogF-PMacA&s",
    ImageAddressMobile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7vKeWxBITWdVQnCj-OpUUshej7ogF-PMacA&s",
    ImageName: "Comedy shows",
    description: `Get ready to laugh until your sides hurt at our uproarious comedy show! Join us for an evening filled with non-stop hilarity, as talented comedians take the stage to tickle your funny bone. From witty one-liners to side-splitting anecdotes, prepare for an unforgettable night of laughter and entertainment. Let's banish the blues and share in the joy of laughter at our comedy extravaganza!`,
  },
];
function Desktop() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="GallarySection">
        {gallaryObj.map((gallary) => (
          <div className="cart" key={gallaryObj.id}>
            <li className="cards__item">
              <a
                className="cards__item__link"
                href={`/events?id=${gallary.id}`}
              >
                <figure
                  className="cards__item__pic-wrap"
                  data-category={gallary.ImageName}
                >
                  <img
                    className="cards__item__img"
                    alt="Travel Image"
                    src={gallary.ImageAddress}
                  />
                </figure>
                <div className="cards__item__info">
                  <h5 className="cards__item__text">{gallary.description}</h5>
                </div>
              </a>
            </li>
            {/* <img
              src={gallary.ImageAddress}
              // src={gallary.ImageAddressMobile}
              alt={`${gallary.ImageName}`}
            />
            <div className="title">{gallary.ImageName}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
//
function Mobile() {
  return (
    <div>
      <div className="GallarySection">
        {gallaryObj.map((gallary) => (
          <div className="cart" key={gallaryObj.id}>
            <img
              // src={gallary.ImageAddress}
              src={gallary.ImageAddressMobile}
              alt={`${gallary.ImageName}`}
            />
            <div className="title">{gallary.ImageName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function GallarySection() {
  return (
    <div>
      <Media queries={{ small: "(max-width: 1240px)" }}>
        {(matches) => (matches.small ? <Mobile /> : <Desktop />)}
      </Media>
    </div>
  );
}

export default GallarySection;
