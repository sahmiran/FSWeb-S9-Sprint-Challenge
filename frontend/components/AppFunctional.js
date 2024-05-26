import axios from "axios";
import React, { useState } from "react";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);
  //const [yon, setYon] = useState("");

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y };
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    const { x, y } = getXY();
    return `Koordinatlar (${x}, ${y})`;
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    //burayi kullanmadik
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    console.log(evt);
    //let text = evt.target.textContent;

    let yonumuz = evt.target.textContent;
    console.log(yonumuz);
    if (yonumuz === "SOL") {
      if (index % 3 !== 0) {
        setIndex((prevIndev) => prevIndev - 1);
        setSteps((prevStep) => prevStep + 1);
      } else {
        setMessage("Sola gidemezsiniz");
      }
    } else if (yonumuz === "SAĞ") {
      if (index % 3 !== 2) {
        setIndex((prevIndev) => prevIndev + 1);
        setSteps((prevStep) => prevStep + 1);
      } else {
        setMessage("Sağa gidemezsiniz");
      }
    } else if (yonumuz === "YUKARI") {
      if (index >= 3) {
        setIndex((prevIndev) => prevIndev - 3);
        setSteps((prevStep) => prevStep + 1);
      } else {
        setMessage("Yukarıya gidemezsiniz");
      }
    } else if (yonumuz === "AŞAĞI") {
      if (index < 6 && index < 9) {
        setIndex((prevIndev) => prevIndev + 3);
        setSteps((prevStep) => prevStep + 1);
      } else {
        setMessage("Aşağıya gidemezsiniz");
      }
    }
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    const kordinat = getXY();
    evt.preventDefault();
    axios
      .post("http://localhost:9000/api/result", {
        x: kordinat.x,
        y: kordinat.y,
        steps: steps,
        email: email,
      })
      .then(function (response) {
        console.log(response);
        setMessage(response.data.message);
        setEmail(initialEmail);
      })
      .catch(function (error) {
        console.log(error);
        setMessage(error.response.data.message);
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates" data-test="data-test-1">
          {getXYMesaj()}
        </h3>
        <h3 id="steps" data-test="data-test-2">
          {steps} kere ilerlediniz
        </h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message" data-test="data-test-3">
          {message}
        </h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={ilerle} data-test="sol-button-testi">
          SOL
        </button>
        <button id="up" onClick={ilerle}>
          YUKARI
        </button>
        <button id="right" onClick={ilerle} data-test="sag-button-testi">
          SAĞ
        </button>
        <button id="down" onClick={ilerle}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          onChange={onChange}
          value={email}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
