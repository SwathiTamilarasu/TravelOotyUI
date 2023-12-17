import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, Container } from "@mui/material";
import Exp from "../images/exp.png";
import botanical from "../images/ooty/botanical.jpg";
import avalanche from "../images/ooty/avalanche.jpg";
import boathouse from "../images/ooty/boathouse.jpg";
import dodhabetta from "../images/ooty/dodhabetta.jpg";
import emerald from "../images/ooty/emerald.jpg";
import kalhattyfalls from "../images/ooty/kalhattyfalls.jpg";
import mudumalai from "../images/ooty/mudumalai.jpg";
import mukurthi from "../images/ooty/mukurthi.jpg";
import needlerock from "../images/ooty/needlerock.jpg";
import pykaara from "../images/ooty/pykaara.jpg";
import rosegarden from "../images/ooty/rosegarden.jpg";
import sixthmile from "../images/ooty/sixthmile.jpg";
import upperbhavani from "../images/ooty/upperbhavani.jpg";

import dolphinenose from "../images/coonoor/dolphinenose.jpg";
import hiddenvalley from "../images/coonoor/hiddenvalley.jpg";
import kethivalley from "../images/coonoor/kethivalley.jpg";
import lambsrock from "../images/coonoor/lambsrock.jpg";
import lawsfalls from "../images/coonoor/lawsfalls.jpg";
import ralliadam from "../images/coonoor/ralliadam.jpg";
import saintschurch from "../images/coonoor/saintschurch.jpg";
import simspark from "../images/coonoor/simspark.jpg";

import Header from "./header";
import Footer from "./footer";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const useStyles = makeStyles({
  root: {
    marginTop: 50,
  },
  expimg: {},
  locationsel: {
    fontSize: "16px",
  },
  title: {
    color: "#1C4076",
    fontSize: 22,
    fontWeight: "bold",
  },
  content: {
    fontSize: "14px",
    textAlign: "justify",
    lineHeight: "24px",
  },
  mainContentGrid: {
    paddingTop: "15px",
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <p>{children}</p>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Experience() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <Header />
      <Grid className={classes.expimg}>
        <img
          src={Exp}
          alt="experience"
          class="img-responsive"
          style={{ width: "100%" }}
        />
      </Grid>
      <Container>
        {/* <Grid className={classes.gridspace} xs={12} sm={12}>
          <p
            style={{
              fontSize: "22px",
              color: "#000000",
              padding: "20px",
              fontWeight: "bold",
            }}
          >
            Location
          </p>
        </Grid> */}

        <Box sx={{ width: "100%" }} style={{paddingTop:"20px"}}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                style={{ fontSize: "22px" ,width:"200px"}}
                label="Ooty"
                {...a11yProps(0)}
              />
              <Tab
                style={{ fontSize: "22px" ,width:"200px"}}
                label="Coonoor"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Grid className={classes.gridspace}>
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={4}>
                  <img
                    src={botanical}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Botanical Garden</p>
                  <p className={classes.content}>
                    This garden was laid out in 1897 and is spread over 55
                    acres. Lush green, well maintained lawns, rare trees species
                    (like the cork tree which is probably the only such tree in
                    India, the paper bark tree and the monkey puzzle
                    tree-monkeys cannot climb this tree), a 20 million year old
                    fossilized tree, an Italian-style garden bordering a clear
                    pool, a vast variety of flowering bushes and plants in
                    myriad hues (exotic and ornamental), fern house with a vast
                    range of ferns and orchids, are some of the many highlights
                    of this garden. A flower show along with an exhibition of
                    rare plant species is held every year in month of May at
                    this garden.
                    <br />
                    The Government Botanical Garden in Ooty is open from 7 in
                    the morning till 6:30 in the evening. It is open on all days
                    of the week.
                    <br />
                    The entry ticket fee to visit Ooty Botanical Gardens is Rs.
                    30 for adults and Rs. 15 for Children. To take your cameras
                    along with you, you need to pay an additional amount of Rs.
                    50 for a still camera and Rs. 100 for a video camera.
                  </p>
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Avalanche</p>
                  <p className={classes.content}>
                    Travel 28 kms from Ooty town past the Emerald Lake
                    surrounded by undisturbed forest and you have reached
                    Avalanche. It is on the way to Upper-Bhavani from Ooty via
                    Emerald Camp. The gorgeous scenery at every turn is an
                    experience of wonder and delight. The views from the top of
                    the hill at Avalanche give a magnificent sight of the
                    Avalanche Valley and reservoir In many places here, the
                    shoals are so thick that even sunlight cannot penetrate.
                    Avalanche is home to a wide variety of birds in great
                    abundance. Spotting and identifying them can be a very
                    rewarding experience for bird lovers
                    <br />
                    There is no entry fee to visit Avalanche Lake Ooty, and
                    you’re free to visit it throughout the year. But you’ll need
                    to pay for the government vehicle at the checkpoint. Private
                    cars aren’t allowed inside, and you’ll have to travel in a
                    jeep/bus for the last 3-4 km to the lake. The buses run at
                    fixed intervals, and the charge is ₹200 per person. You can
                    opt for the jeep if you prefer that. It is available at
                    ₹2000 per trip, and each jeep can accommodate eight people.
                    <br />
                    The regular visit timings for Avalanche Lake Ooty are from 9
                    AM to 3 PM. On some days, however, the forest department
                    might restrict access to this pristine lake due to uncertain
                    weather conditions. So, check with the office before
                    planning a camp, safari or any other activity there.
                  </p>
                </Grid>
                <Grid item xs={12} md={4}>
                  <img
                    src={avalanche}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={4}>
                  <img
                    src={emerald}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Emerald Lake</p>
                  <p className={classes.content}>
                    Emerald Lake is located in Emerald Village  away from the
                    hustle and bustle of a city, offering some peace and quiet
                    so that you can relax in the lap of nature. That is because
                    Emerald Lake is still pristine and less frequented compared
                    to other places visited by tourists in South India every
                    year.
                    <br />
                    Travel enthusiasts visit Emerald Lake for its breathtaking
                    scenic beauty such as the lush Nilgiri hills and the tea
                    plantations surrounding the water body. With tea plantations
                    surrounding Emerald lake, you can buy various tea products
                    if you like.  The lake and its picturesque surroundings are
                    a photographer’s paradise for taking beautiful photos of the
                    landscape. Emerald Lake is also visited due to its stunning
                    sunrise and sunset views, which is a bonus or takeaway for
                    photographers.
                    <br />
                    It is an ideal picnic spot for locals and tourists alike.
                    You can carry picnic baskets and some badminton gear when
                    visiting this place.  The surrounding woods and blue
                    lake-water are home to diverse flora and fauna. Take delight
                    in watching some native birds including ducks and other
                    aquatic animals.
                    <br />
                    It is a bird watcher’s paradise, where you can spot them
                    easily  without having to wait for a long time. Emerald Lake
                    is also popular for activities like mountain biking and
                    trekking down the lakeside. Again, if you are not much of an
                    adventure-seeker, you can fish by .
                    <br />
                    There is no entry fee to feel relaxed and renewed at the
                    picturesque Emerald Dam in Ooty. It welcomes its tourists
                    from 6 AM in the morning to 5 PM on all days of the week.
                  </p>
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Doddabetta</p>
                  <p className={classes.content}>
                    At 2,623 mts above MSL, Doddabetta is the highest Peak in
                    the Tamil Nadu and is about 10 kms. from Ooty bus stand. The
                    name Doddabetta literally means ‘Big mountain’ in the Badugu
                    Language, which is so in reality. It is at the junction of
                    Western and Eastern Ghats and offer beautiful vistas of
                    Nilgiri Hills range. It is surrounded by dense Sholas. One
                    can have a magnificent panoramic view of landscape and the
                    whole of the District and even beyond through the Telescope
                    House run by T.T.D.C., which is an added attraction . The
                    Sunset is spectacular from this view point.
                    <br />
                    You can visit Doddabetta peak anytime from morning 9:00 am
                    till 6:30 pm in the evening. Doddabetta is open for visitors
                    daily.
                    <br />
                    The entry fees of doddabetta peak is Rs. 6 per person for
                    Adults. There is no entry fee for children below 5 years of
                    age.
                    <br />
                    You need to pay Rs 10 for Still camera and Rs 50 for Video
                    camera at this peak.
                  </p>
                </Grid>
                <Grid item xs={12} md={4}>
                  <img
                    src={dodhabetta}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={4}>
                  <img
                    src={kalhattyfalls}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Kalhatty Falls</p>
                  <p className={classes.content}>
                    At a distance of 14 km from Ooty, Kalhatty Falls is an
                    attractive waterfall situated on the Ooty - Mysore Road or
                    Sigur Ghat Road. Also known as the Kalahasti Falls, it is
                    one of the top places to visit in Ooty and also one of the
                    best waterfalls in Ooty.
                    <br />
                    Situated on the slopes of Kalhatti Mountain, the Kalhatty
                    Falls cascades down from a height of 120+ feet and is
                    considered to be an ideal destination for trekking. It is
                    situated at an average height of around 400 feet in the
                    Sigur Plateau of Tamil Nadu.
                    <br />
                    The Kalhatty-Masinagudi slope is rich in wildlife such as
                    Panthers, Bisons, Wild Buffaloes, Wild Dogs, Spotted Deers,
                    Sambars and different types of hill birds. The falls are
                    accessible from main road through a private tea estate.
                    There is a viewpoint that offers a far view of the falls.
                    One can walk down through a narrow path for 15 minutes (one
                    way) from viewpoint to take a closer view & reach bottom of
                    the falls. The path is usually isolated and not suggested to
                    take after 5 PM.
                    <br />
                    The falls offer best views during the monsoon season. The
                    falls is mostly dried up in winter & summer seasons.
                    <br />
                    Timings: 8 AM - 6 PM
                  </p>
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Mudumalai National Park</p>
                  <p className={classes.content}>
                    This is the first Sanctuary to be set up in India and forms
                    part of the Jawharlal Nehru National Park. It is located 36
                    kms from Ooty from Kalhatty and 67 kms via Gudalur. From
                    Mysore it is 91 kms away. This Sanctuary extends over an
                    area of 321 sq.kms in the junction of the three states of
                    Tamil Nadu, Karnataka and Kerala. It is at an elevation of
                    1,140 mtrs. A variety of habitat ranging from tropical
                    evergreen forest, moist deciduous forest, moist teak forest,
                    dry teak forest, secondary grasslands and swamps are found
                    here.
                    <br />
                    It is rich in wildlife, like Elephants, Gaur, Tiger,
                    Panther, Spotted Deer, Barking Deer, Wild Boar, Porcupine
                    etc., birds like-minivets, hornbill, fairy Blue Birds,
                    Jungle Fowls etc., and reptiles like python, Monitor Lizards
                    Flying Lizards etc., You can take a ride into the jungle on
                    elephant back or take a vehicle ride along designated
                    visitor’s route inside the jungle. The elephant rides have
                    to be booked at Ooty. The Mayor river and the life around it
                    is an experience by itself. The Theppakadu elephant camp is
                    popular tourist attraction.
                    <br />
                    You can visit the national park anytime during the year. The
                    regular opening hours are from 6 AM to 6 PM, and Mudumalai
                    National Park entry fee is ₹30 per person. You also have to
                    pay ₹53 for a still camera and ₹315 to use a video camera.
                    <br />
                    The bus safari timings are between 7 AM and 10 AM and then
                    again in the evening from 3 PM to 6 PM. Each ride is for one
                    hour and the tickets can be purchased from the reception at
                    Theppakadu. There is no option for online booking or
                    reservation for Safari. The tickets at the counter are
                    available for ₹340 per person. Mudumalai National Park jeep
                    safari costs ₹4,200 per trip. Many private jeep operators
                    also offer their services, but they take you only to the
                    “buffer area” of the park. Most animals can’t be seen there.
                    <br />
                    The elephant safari can be availed from 7 AM to 8 AM and
                    from 4 PM to 5 PM. The booking is made at the reception, and
                    each 30-minute ride is priced at ₹1,120.
                  </p>
                </Grid>
                <Grid item xs={12} md={4}>
                  <img
                    src={mudumalai}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={4}>
                  <img
                    src={mukurthi}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Mukurthi National Park</p>
                  <p className={classes.content}>
                    Calling out all the wildlife enthusiasts, Mukurthi National
                    Park is sure to delight you with its remarkable assortment
                    of rich flora and enthralling fauna. Situated in the western
                    corner of Nilgiris Plateau in the state of Tamil Nadu,
                    Mukurthi National Park is a UNESCO World Heritage Site and
                    was formerly known as Nilgiri Tahr National Park. Spread
                    across the area of 78.46 sq km, this protected area was
                    established with the prime motive of conservation of its
                    keystone species, the Nilgiri Tahr. Moreover, it is one of
                    the most sought-after wildlife parks in Tamil Nadu, and
                    hence, is blessed with a rich flora mainly consist of
                    raspberries, rhododendron, and blackberries. Along with
                    that, being a prominent part of Western Ghat, the sanctuary
                    is home to a range of species of birds, animals, insects,
                    and reptiles. The most -famous among them are Barking Deer,
                    Jungle Cat, Panther, Wild Dogs, Indian Elephant, Indian
                    Leopard, Jackal, and more such fascinating wild creatures.
                    In birds, there you’ll find exotic parrots, vultures,
                    eagles, and many migratory birds. However, the talk of this
                    sanctuary is the Nilgiri Tahr which is supposed to be found
                    only in the forest region of the park. Considering that,
                    Mukurthi National Park is a treasure trove for all those who
                    wish to have an indelible wildlife
                    <br />
                    Mukurthi National Park opening hours are between 9 AM and
                    5:30 PM, every day of the week, except Tuesday. The park
                    remains closed for entry on that day.
                    <br />
                    However, you can go there on all other days. Mukurthi
                    National Park entry fee is ₹15 for adults and ₹10 for
                    children between the age of 5 and 12 years. For children
                    studying in government schools though, the charge is ₹2.
                    Entry is free for all children below five years.
                    <br />
                    Other than the entry fee, you’ll have to pay for vehicle
                    parking (if any) and use of cameras. Still cameras are
                    charged at ₹25, and the rate for video recording cameras is
                    ₹150. But if you plan to shoot an educational documentary,
                    you’ll have to shell out ₹2000 for the permission.
                  </p>
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Rose Garden</p>
                  <p className={classes.content}>
                    Situated in the heart of Ooty town, this garden has been
                    beautifully laid out in terraces with rose tunnels, pergolas
                    and bowers with rose creepers. To commemorate the centenary
                    Flower Show, the Rose Park was established at Vijayanagaram
                    in Udhagamandalam covering an area of 4 hectares in five
                    terraces. Today this garden has the largest collections of
                    roses in the country like Hybrid Tea Roses, miniature rose,
                    Floribunda, Ramblers, roses of unusual colours like black
                    and green are some of the more than 3,000 varieties of roses
                    that will captivate your senses. The Rose Garden is situated
                    in slopes of the Elk Hill. The rose varieties planted in
                    this park were assembled from different sources. The ‘Nila
                    Maadam’ is located in a spot from where viewers can see the
                    entire rose garden. This garden is maintained by Tamil Nadu
                    Horticulture Department. It has also received the award of
                    Excellence for the best rose garden in entire south Asia
                    from the International Rose society in 2006.
                    <br />
                    The Government Botanical Garden in Ooty is open from 7 in
                    the morning till 6:30 in the evening. It is open on all days
                    of the week.
                    <br />
                    The entry ticket fee to visit Ooty Botanical Gardens is Rs.
                    30 for adults and Rs. 15 for Children. To take your cameras
                    along with you, you need to pay an additional amount of Rs.
                    50 for a still camera and Rs. 100 for a video camera.
                  </p>
                </Grid>
                <Grid item xs={12} md={4}>
                  <img
                    src={rosegarden}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={4}>
                  <img
                    src={pykaara}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Pykara</p>
                  <p className={classes.content}>
                    Emerging from the Mukurthi Peak, the beautiful Pykara River
                    transforms into gorgeous waterfalls, which ultimately forms
                    a Pykara Lake. Guarded by a lush green cover of the Shola
                    forests, Pykara Lake is believed to be an outcome of the dam
                    constructed across the Mukurti River.
                    <br />
                    The tranquillity of the green surroundings, a thick forest
                    cover at the shores of the Pykara Lake and the tall pine
                    trees in its backdrop gives rise to a pleasing atmosphere.
                    In fact, you can say that thePykara Lake is blessed with
                    everything that you need to make your family outing an
                    endearing one. Irrespective of whether you are a solo
                    traveler or a couple in love, you probably shouldn’t miss on
                    this tourist hotspot on your Ooty tour. 
                    <br />
                    If you feel like adding some adventurous flavor to your
                    weekend celebrations, you can simply hop at the Pykara Lake
                    Boat House. Here, you have various motorboats and speed
                    boats to give you a perfect boating experience.
                    <br />
                    As the captain is busy maneuvering your boat around, you can
                    simply get candid moments of your fellow tour mates. 
                    Besides boating adventure, you can also hike up to the
                    rumbling Pykara Falls. As you proceed from the Lake to the
                    Pykara Falls, be ready to treat yourself with the melodious
                    bird sounds and a cool breeze of air blowing in here and
                    there.
                    <br />
                    Although the timings of Pykara Lake in Ooty vary depending
                    on the weather conditions, you can visit it any day. The
                    usual opening and closing timings are 8:30 AM and 5:30 PM,
                    and the entry fee is ₹10 per person. Pykara Lake boating
                    timings are between 10:00 AM and 5:30 PM every day, and the
                    boating charges are collected per boat instead of the number
                    of people.
                    <br />
                    770 + Tax for 8 seater Motor Boat (20 min)
                    <br />
                     890 + Tax for 10 seater Motor Boat (20 min)
                    <br />
                     1240 + Tax for 15 seater Motor Boat (20 min)
                    <br />
                     800 + Tax for 2 seater Speed Boat (10 min)
                    <br />
                  </p>
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Ooty Boat House</p>
                  <p className={classes.content}>
                    Ooty lake is an artificial lake constructed by John
                    Sullivan, in 1824. The water flowing down mountain streams
                    in the Ooty valley was dammed to form the lake. The lake
                    became empty on three occasions when it breached its bund.
                    The lake was originally intended to be used for fishing with
                    ferries being used to travel across the lake. It gradually
                    shrunk from its original size giving place to the current
                    bus stand race course, and the lake park. The Tamil Nadu
                    Tourism Development Corporation on behalf of the Tourism
                    Department took the possession of the lake in 1973, for
                    providing boating facilities as a tourist attraction.
                    <br />
                    The entry fee for the Ooty Honeymoon Boat House is INR 30
                    per adult. Tourists from all around the world can visit this
                    place from 9 AM in the morning to 6 PM in the evening at any
                    time.
                    <br />
                    Rs-170 2 Seater Pedal Boat 
                    <br />
                    Rs-260 4 Seater Pedal Boat 
                    <br />
                    Rs-520 8 Seater Motor Boat 
                    <br />
                    Rs-640 10 Seater Motor Boat 
                    <br />
                    Rs-950 15 Seater Motor Boat 
                    <br />
                    Rs-205 3+1 Seater Row Boat 
                    <br />
                    Rs-245 5+1 Seater Row Boat
                    <br />
                  </p>
                </Grid>
                <Grid item xs={12} md={4}>
                  <img
                    src={boathouse}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={4}>
                  <img
                    src={upperbhavani}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Upper Bhavani Lake</p>
                  <p className={classes.content}>
                    The Upper Bhavani Lake is a mesmerising and breathtaking
                    lake that is located above the Avalanche Area in the Nilgiri
                    Hills in Udhagamandalam, (also known as Ooty), in Tamil
                    Nadu. This beautiful lake, which was previously ignored and
                    consequently unexplored, is now gaining some popularity and
                    credit for its charming beauty and picturesque scenes. Prior
                    permission by the Forest Department is required to enter the
                    area, along with details of the number of the car and the
                    people who are coming into this zone. The journey to the
                    Upper Bhavani Lake from Ooty is a long car ride, followed by
                    a trip in a bus/jeep and provides the tourists with
                    spectacular views of famous attractions such as Avalanche
                    Hydel Power, Cauliflower Forest, Bhavani Amman Temple and
                    the Upper Bhavani backwaters. Tourists can also spot
                    numerous animals and birds like peacocks and tigers on the
                    way.
                    <br />
                    Even though no one is allowed to touch the water of this
                    pristine lake, the view in itself is worth it. When even the
                    tallest and most exquisite of hill stations in Ooty fail to
                    provide a touristy feeling and adventure, the Upper Bhavani
                    Lake comes to the rescue. The place primarily appeals to
                    those who like to travel on the 'road less taken'. It is
                    indeed a pity that almost 99% of the tourists who visit Ooty
                    are unaware of this lake. Perhaps this is why the Upper
                    Bhavani Lake continues to remain a uncrowded and untouched
                    virgin place that one needs to explore. 
                    <br />
                    Upper Bhavani Lake is open to the general public on all
                    days.The official timings for the opening of the forest
                    department office are 10:30 AM. The tours are available
                    between 10:00 AM to 3:00 PM.
                    <br />
                    There is no entry fee as such to view the lake.However, to
                    reach the Upper Bhavani Lake, you will have to hire
                    government employed vehicles. The ticket to ride in the
                    vehicle is as follows:
                    <br />
                    1. Safari Bus Ride: INR 150 per person
                    <br />
                    2. Safari Jeep Ride: INR 1200 (Maximum 8 people allowed)
                  </p>
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>6th Mile Ooty</p>
                  <p className={classes.content}>
                    Nestled in the Nilgiris, Ooty is blessed with natural
                    beauty. There are picturesque green valleys, towering blue
                    mountains and numerous tranquil waterfalls. Scenic
                    viewpoints are everywhere to drench yourself in the
                    panoramic views of the landscape. 6th Mile Ooty is one such
                    tourist spot.
                    <br />
                    Where is 6th Mile Ooty? It is 6 miles (or about 10 km) away
                    from Ooty. It is a part of the Wenlock Downs and numerous
                    Indian movie shootings have taken place over the years. The
                    area is surrounded by dense Shola forests, and those form a
                    stunning backdrop for these extensive lush green grasslands.
                    <br />
                    6th Mile Shooting Spot Ooty is relaxing, and it’s a pleasant
                    space allowing you an escape from the chaotic hustle and
                    bustle of city life. Even the drive towards 6th Mile has a
                    calming effect. So, pack your bags and don’t forget to check
                    this serene landscape during your Ooty trip.
                    <br />
                    Entry fee to sixth mile Ooty is Rs. 5 per person. And you
                    can visit the spot throughout the day, whether you want to
                    enjoy the chilly mornings or the cool calming breeze in the
                    evening. However, it’s suggested to be there only during the
                    daytime, from 8 AM to 6 PM. The best views are available
                    during the afternoon when the sky remains clear.
                  </p>
                </Grid>
                <Grid item xs={12} md={4}>
                  <img
                    src={sixthmile}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={4}>
                  <img
                    src={needlerock}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Needle Rock View Point</p>
                  <p className={classes.content}>
                    Located 40 kilometres from Ooty, the Needle Rock View Point
                    offers a stunning view of the beautiful mountains. The view
                    point is named so for its 360 degree view of the whole
                    terrain and combined with the clouds that touch the mountain
                    peaks- offers one of the best views of the Nilgiris. The
                    pathway that leads to the view point is just as mesmerising.
                    <br />
                    The highlight however, is seeing the sunset. Pack a small
                    picnic to spend some quality time in the lap of nature, to
                    make the most out of your visit.  
                    <br />
                    1. Admission Fee to the view point is INR 10 per person. 
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
          <Grid className={classes.gridspace}>
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={4}>
                  <img
                    src={simspark}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Sims Park </p>
                  <p className={classes.content}>
                  Founded in 1874, Sim's Park extends over upper Coonoor with winding footpaths, lovely gazebos, and a dense Shola Forest nearby. Named after J.D. Sim, a former Secretary to Government, Sim’s Park in Coonoor features a wonderful collection of trees and plants species, both native and from as far as Central America.
                    <br />
                    Visited by hundreds of families and honeymooners, Sim’s Park is a short walk from the northern end of Coonoor Railway Station. The park-cum-botanical garden lies at an elevation of 1768 to 1798 metres. A natural evergreen forest with winding trails covers the higher slopes of this park adding more beauty to its original appeal. There are many trees planted in a scattered way in the garden which attracts visitors of all ages. Comprising an area of 12 hectares, the garden features ethnic trees which co-habit with various other tree species introduced here from all over the world.
                    <br />
                    Visitors can also enjoy boating in Sim’s Park. There is a tiny lake in Sim’s Park with peddle boats. There is a glass house which is home to a few species of medicinal plants. Visitors can also take a lovely stroll through its rose garden to see flowers of different families.
                  </p>
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Lambs rock</p>
                  <p className={classes.content}>
                  The mountainous region engulfing Lamb’s Rock is myriad meters above sea level. One can reach the top of Lamb’s rock after a thrilling trek and can view a vast expanse of the outstanding landscape. Lamb’s Rock is the perfect place to enjoy the beauty of nature and is filled with tranquil.
                    <br />
                    To reach Lamb’s Rock, one needs to carefully drive between the bends of roads, scented by tea and coffee plantations. This ride is guaranteed to be fantastic.
                    <br />
                    One needs to trek for about 500 to 950 meters to arrive the viewpoint. The trekking experience is unbeatable, as you get to see wonderful sights as you trek and your adrenaline gushes with every step moving higher.
                  </p>
                  <br/>
                  At the viewpoint, you get to see one of the most picturesque scenes in the country- lush green tea and coffee plants, the plains of Coimbatore and thick dense forests, all in a single frame.
                  <br/>
                  This is the place to enjoy by oneself or with friends and family. With wind on your face and a panorama presented to your eyes, what more bliss can you ask for.
                  <br/>
                  Local photographers are available to capture your magical moments in the beat angles
Do not forget to carry your binoculars, because two other top tourist attractions, the Dolphin’s Nose and the Catherine Falls can be seen clearly from the Lamb’s Rock.
                </Grid>
                <Grid item xs={12} md={4}>
                  <img
                    src={lambsrock}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={4}>
                  <img
                    src={dolphinenose}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Dolphin nose</p>
                  <p className={classes.content}>
                  Situated at around 12km away from Coonoor, Dolphin Nose will stand to your expectations. Just as the photo point in Munnar is well renowned for its picturesque scenes, this place has its own charms. Dolphin's nose is situated in Nilgiri district, which is a hilly area.
                    <br />
                    Standing at a majestic 1000feet above the sea level, this place in Ooty is the spectacular point to visit. This peak is well known as the Dolphin’s nose as its tip of the peak is shaped in Dolphin’s nose. Hence this place derived its name. There are many tea plantations on the way
                    <br />
                    This area has an enormous rock formation that is entirely unique. There are formations of ravines on either side of this hill. The view of the Catherine Falls which is thousands of feet below is just mind-blowing. This fall is found at a short distance from this well-known hill.
                    
                  </p>
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Rallia dam </p>
                  <p className={classes.content}>
                  Ralliah dam is found close to the Wellington Road, which is around 9km from Coonoor. Most of the people are not aware of this place. It is hidden in the forest; from parking area you need to trek 1 km to reach that dam since there is no proper road for vehicles. The dam and surrounded area will provide you an astonishing view. You can spot out Bisons or Malabar squirrels in this place. Best time to visit is Monsoon season.
                    <br />
                    Ralliah dam is found close to the Wellington Road, which is around 9km from Coonoor. Most of the people are not aware of this place. It is hidden in the forest; from parking area you need to trek 1 km to reach that dam since there is no proper road for vehicles.
                  </p>
                </Grid>
                <Grid item xs={12} md={4}>
                  <img
                    src={ralliadam}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={4}>
                  <img
                    src={saintschurch}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>All Saints Church</p>
                  <p className={classes.content}>
                  Built 163 years ago, the All-Saints Church is one of the oldest churches in Coonoor. This reformed protestant church was a part of the church of England. Established in 1854, the church adorned with beautiful interiors and is identified as an old Anglican church. It owns an ancient pipe organ and antique wooden interiors.
                    <br />
                    The stained-glass windows and its classical appearance give you a feeling of a typical British countryside with a building of huge dome-like structures. Tall pine trees surround the church, with a beautiful landscape that adds on to its beauty.
                  
                  </p>
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Laws falls</p>
                  <p className={classes.content}>
                  About 7 km outside the town of Coonoor, Law's Falls is an amazing destination for picnic and to be in the lap of nature. Situated on the Mettupalayam-Coonoor-Ooty route, the falls has height of over 180 ft surrounded by thick natural forests. A lovely place to be for naturalists and children.
                   
                   
                  </p>
                </Grid>
                <Grid item xs={12} md={4}>
                  <img
                    src={lawsfalls}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
              </Grid>
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={4}>
                  <img
                    src={hiddenvalley}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Hidden valley</p>
                  <p className={classes.content}>
                  Hidden Valley is all about exploring the unexplored places of Coonoor. This inaccessible place is an unusual location that gives its visitors a scenic picturesque. Hence making it a thrilling place to visit. Nestled on verdant greenery on the outskirts of Coonoor, this place is an excellent getaway for adventure enthusiasts. Mountaineering, rock climbing, and trekking are the other attractions of Hidden Valley.
                    <br />
                    The valley is a pure delight for nature lovers and trekkers. Located beyond the Wellington Golf Course and near the Sim's falls, the valley a perfect picnic spot for families and a romantic spot for couples. However, if you are with friends, the place has other activities that might interest youngsters. Although the journey is physically demanding, one would never regret it for the remarkable experience.
                   
                  </p>
                </Grid>
              </Grid>
              <br />
              <br />
              {/* <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Catherine falls</p>
                  <p className={classes.content}>
                  Catherine Falls in Kotagiri near Ooty is made popular by its seclusion from the cacophony of the urban areas. The falls are nestled amidst the lush greens of the Nilgiris and are a pristine location to see the beauty of nature. The water of the Kallar River, cut off by the Mettupalayam - Ooty road beyond the mountains, falls in a double cascade from over a height of 250 metres as it forms the Catherine Falls, making it the second highest waterfall of the Nilgiris. Located near Kotagiri, this tourist-favourite spot is often visited by people travelling the Ooty-Coonoor region for a place cut off from the crowd.
                    <br />
                    Catherine Falls is truly a place in the lap of nature for the travellers to soak in the ambience, for the explorers to discover all that nature has to offer, for the trekkers to take on the adventurous path and for the shutterbugs to capture some of the best sceneries. The emerald forests and tea gardens of the Nilgiris make the place look like a paradise of freshness and an abode for all the wilderness possible. An ideal spot for the tourists and the occasional wanderer soul as well - it is one of the best places to visit in the whole district of Nilgiri.
              
                  </p>
                </Grid>
                <Grid item xs={12} md={4}>
                  <img
                    src={avalanche}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
              </Grid> */}
              <br />
              <br />
              <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>Ketti Valley</p>
                  <p className={classes.content}>
                  Located in the beautiful hills extending from Coonoor to Ooty in Tamil Nadu is the beautiful Ketti Valley. The best way to visit this beautiful valley, that is if you want to really feel its beauty is to take the toy train which is like a 20–25-minute ride.
                    <br />
                    The Ketti Valley is also famous for bird watching and especially trekking. Being the second-largest gorge in the world, the Ketti Valley is a natural beauty surrounded by the beautiful blue mountains( Nilgiri hills). Do not forget to visit the famous Shiva Lingam temple, the tea gardens and to mention the amazing waterfalls in the area.
                  </p>
                </Grid>
                <Grid item xs={12} md={4}>
                  <img
                    src={kethivalley}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
              </Grid>
              <br />
              <br />
              {/* <Grid
                container
                spacing={5}
                className={classes.mainContentGrid}
                alignItems="top"
              >
                <Grid item xs={12} md={8}>
                  <p className={classes.title}>St.Georges Church</p>
                  <p className={classes.content}>
                  St George's church is an essential tourist's attraction. Constructed in the year 1926, the church is a beautiful remnant of the gothic structure of the British era. It is an archetypal cantonment church with white inlay work and an intense ochre stucco. The church is constructed in the ancient Raj style of architecture, with a serene environment. To see the interiors of the church one must pass through the vestibule where the vaulted roof with six iconic columns separates the church to side aisles.
                    <br />
                    The altar is enriched entirely with white marble inlay which makes it look enchanting. Apart from this, the church houses a collection of paintings and curved interiors. A notable occasion at the church is the Sunday closest to the National Martyrs Day wherein a unique service in honour of our martyrs is held in the church. The station commander of Wellington places the wreath over a plaque that reads "when you go home, tell them of us and say, for their tomorrow, we gave our today."
                  
                  </p>
                </Grid>
                <Grid item xs={12} md={4}>
                  <img
                    src={avalanche}
                    alt="blog"
                    class="img-responsive"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </Grid>
              </Grid> */}
              
            </Grid>
          </TabPanel>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}
