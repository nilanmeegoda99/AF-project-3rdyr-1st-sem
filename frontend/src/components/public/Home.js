import React, { useEffect, useState, useRef } from "react";
import "../../static/Home.css";
import person1 from "url:../../../public/images/person1.jpg";
import person2 from "url:../../../public/images/person2.jpg";
import person3 from "url:../../../public/images/person3.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 1500,
    margin: 25,
  },
  media: {
    height: 350,
    width: 320,
  },
});

const Home = () => {
  const classes = useStyles();
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, settimerHours] = useState("00");
  const [timerMinutes, settimerMinutes] = useState("00");
  const [timerSeconds, settimerSeconds] = useState("00");

  let interval = useRef();

  const statTimer = () => {
    const countDownDate = new Date("Aug 30 2021 00:00:00").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        //stop our timer
        clearInterval(interval.current);
      } else {
        //update timer
        setTimerDays(days);
        settimerHours(hours);
        settimerMinutes(minutes);
        settimerSeconds(seconds);
      }
    }, 1000);
  };

  //component Did mount
  useEffect(() => {
    statTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <div>
      <section className="main-frame">
        <h1 className="main-header">Welcome to ICAF</h1>
        <p className="main-para">
          like Aldus PageMaker including versions of Lorem Ipsum. Contrary to
          popular belief, Lorem Ipsum is not simply random text. It has roots in
          a piece of classical Latin literature from 45 BC, making it over 2000
          years old. Richard McClintock, a Latin professor at Hampden-Sydney
          College in Virginia, looked up one of the more obscure Latin words,
          consectetur, from a Lorem Ipsum passage, and going through the cites
          of the word in classical literature, discovered the undoubtable
          source.
        </p>
      </section>

      <section className="about">
        <h3 className="custom_heading">About Our Conference</h3>
        <h2 class="conference-title">
          17th International Conference on Advancements in AI and Machine
          Learning 2021
        </h2>
        <p className="custom-para1">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum. Contrary to popular belief, Lorem
          Ipsum is not simply random text. It has roots in a piece of classical
          Latin literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
        </p>
        <p className="custom-para2">
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during
          the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32. The standard chunk of
          Lorem Ipsum used since the 1500s is reproduced below for those
          interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
          Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H.
          Rackham.
        </p>
      </section>

      <section className="timer-container">
        <section className="timer">
          <div>
            <span className="mdi mdi-calendar-clock timer-icon"></span>
            <h2>Countdown Timer</h2>
            <p>
              Countdown to really special date. One you couldor would never
              imagine !
            </p>
          </div>
          <div>
            <section>
              <p>{timerDays}</p>
              <p>
                <small>Days</small>
              </p>
            </section>
            <span>:</span>
            <section>
              <p>{timerHours}</p>
              <p>
                <small>Hours</small>
              </p>
            </section>
            <span>:</span>
            <section>
              <p>{timerMinutes}</p>
              <p>
                <small>Minutes</small>
              </p>
            </section>
            <span>:</span>
            <section>
              <p>{timerSeconds}</p>
              <p>
                <small>Seconds</small>
              </p>
            </section>
          </div>
        </section>
      </section>

      <section className="KeyNote">
        <h1 className="keynote-header">Key Note Speakers</h1>
        <center>
          <section className="cards">
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia className={classes.media} image={person1} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Mark Zuckerberg
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Founder Of Facebook ok like readable English. Many desktop
                    publishing packages and web page editors
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia className={classes.media} image={person2} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Elon Musk
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Founder of Tesla And SpaceX es, but also the leap into
                    electronic typesetting, remaining essentially unchanged
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia className={classes.media} image={person3} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Richard Devidson
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Founder Of Paypal is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </section>
        </center>
      </section>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Home;
