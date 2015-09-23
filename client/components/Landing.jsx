var ThemeManager = new MUI.Styles.ThemeManager();
injectTapEventPlugin()
var {
    Dialog
} = MUI;

Landing = React.createClass({
	childContextTypes: {
        muiTheme: React.PropTypes.object,
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme(),
        }
    },
	componentDidMount() {
		if (this.props.showDialog == "orderSentDialog")
			this.refs.orderSentDialog.show()
	},
	goNewOrder() {
        Order.createOrder()
	},
	goLogin() {
		FlowRouter.go('/login')
	},
	closeDialog() {
		FlowRouter.setQueryParams({showDialog: null})
		this.refs.orderSentDialog.dismiss()
	},
	render() {
		var actions = [{text: 'OK', onTouchTap: this.closeDialog, ref: "close"}]
		return (
		<div className="landing">
			<Dialog
				title="Tellimus edastatud."
				ref="orderSentDialog"
				actions={actions}
				onDismiss={this.closeDialog}>
				Täpsustavate küsimuste korral võtame Sinuga ise ühendust. Meiega saad kontakti appi@toitla.com või +3725216686.
			</Dialog>
      <div className="logo"><img className="toitla" src="/icons/white-toitla.svg"/>
      </div>
      <table className="main">
        <tr>
          <td className="left">
            <h2>Toome kodused suupisted, küpsetised ja näpu-lõunad Sinu üritusele</h2>
            <div onClick={this.goNewOrder} className="btn order">
              <p><strong>Telli</strong> </p>
            </div>
          </td>
          <td className="right">
            <h2>Soovid pakkuda oma suupisteid või küpsetisi?</h2>
            <div onClick={this.goLogin} className="btn chef">
              <p><strong>Liitu</strong> </p>
            </div>
          </td>
        </tr>
      </table>
      <div className="bottom">
        <a className="facebook" href="https://www.facebook.com/toitlacom" target="_blank">Facebook</a>
      </div>
      <h1 className="huge2">Kontakt</h1>
      <p className="tekst">food@toitla.com</p>
      <p className="tekst">+372 521 6686</p>
      <p className="tekst">Orase 4a, Tallinn, Estonia</p>
      <h1 className="huge">Meist</h1>
      <p className="tekst">Meil sai suurköökide suupistetest villand. Otsustasime turule tuua väiksed, kuid suure südamega tegijad. Toitla ühendab endas kirglikke kodukokkasid, kohalikke pisipagareid, kodukohvikuid ja teisi iseseisvaid tegijad. Teeme Sulle isikupärased suupisted, kodused küpsetised ja eripärased näpu-lõunad imelihtsalt kättesaadavaks.
Meil on veel pikk iduettevõtlusteekond käia, kuid lubame, et juba täna üllatame Sind üle ootuste positiivselt (ja kui ei üllata, siis me tahame sellest teada!). Kui Sul on häid mõtteid meie tegevuse osas või tahad kaasa lüüa, siis võta meiega ühendust.</p>
      <h1 className="huge">Pakume</h1>
      <p className="tekst">Kui plaanid mõne ürituse kohvipausi või lõunat, sünnipäeva sõprade seltsis, tähtpäeva tööl või lihtsalt erilisemat hetke mõne seltskonnaga, siis meil saad just Sulle sobivad soolased ja magusad suupisted. Meie kokad kasutavad naturaalset ja värsket toorainet, tööstuslikke lisaaineid lisamata. Võimalusel eelistatakse kodumaist tootjat või ka oma enda koduaia saadusi. Pöörame erilist tähelepanu toitumise erivajadustele ja allergiatele. Meie jaoks kõige olulisem on tagada toidu kvaliteet. Toidud valmistatakse vaid konkreetsele üritusele vahetult enne üritust. Vajadusel pakume juurde värskelt röstitud ning kohapeal valmistatud kohvi, naturaalset teed ja maitsestatud kraanivett. Tegutseme Tallinnas ja suupisteid pakume gruppidele alates 15 inimesest.</p>
      <div className="gallery">
        <h1 className="huge2">Oleme kostitanud üle 1000 inimese ja pakkunud enam kui 4100 suupistet.</h1>
        <h1>Fleep kliendiüritus</h1>
        <h2>100 inimest, üks päev</h2>
        <div className="images">
          <a href="/images/events/Fleep/fleep5.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep5.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep6.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep6.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep7.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep7.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep8.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep8.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep9.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep9.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep3.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep3.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep1.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep1.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep10.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep10.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep2.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep2.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep11.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep11.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep12.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep12.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep13.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep13.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep14.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep14.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep15.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep15.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep16.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep16.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep17.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep17.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep18.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep18.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep19.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep19.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep21.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep21.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep22.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep22.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep23.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep23.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep25.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep25.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep26.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep26.JPG)"}}>
            </div>
          </a>
          <a href="/images/events/Fleep/fleep27.JPG" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/Fleep/fleep27.JPG)"}}>
            </div>
          </a>
        </div>
        <h1>GoingGlobal module 2</h1>
        <h2>60 inimest, 2 päeva</h2>
        <div className="images">
          <a href="/images/events/GoigGlobalM2/HeiliSandwichCake.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/HeiliSandwichCake.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/HeiliSandwichCake2.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/HeiliSandwichCake2.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/IMG_8907.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/IMG_8907.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/IMG_8917.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/IMG_8917.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/IMG_8918.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/IMG_8918.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/IMG_8919.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/IMG_8919.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/IMG_8925.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/IMG_8925.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/IMG_8929.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/IMG_8929.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/IMG_8936.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/IMG_8936.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/IMG_8961.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/IMG_8961.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/IMG_8989.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/IMG_8989.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/_MG_3647.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/_MG_3647.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/_MG_3648.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/_MG_3648.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/_MG_3652.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/_MG_3652.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/_MG_3664.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/_MG_3664.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/Photo%2024.04.15%2015%2044.40.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/Photo%2024.04.15%2015%2044.40.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/Photo%2025.04.15%209%2019.11.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/Photo%2025.04.15%209%2019.11.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/Photo%2025.04.15%2013%2007.49.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/Photo%2025.04.15%2013%2007.49.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/Photo%2025.04.15%2015%2028.40.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/Photo%2025.04.15%2015%2028.40.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/Photo%2025.04.15%2015%2057.36.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/Photo%2025.04.15%2015%2057.36.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/GoigGlobalM2/Photo%2025.04.15%2015%2058.01.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/GoigGlobalM2/Photo%2025.04.15%2015%2058.01.jpg)"}}>
            </div>
          </a>
        </div>
        <h1>Engage Estonia
        </h1>
        <h2>100 inimest, üks päev
        </h2>
        <div className="images">
          <a href="/images/events/EngageEstonia/_MG_4022.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/EngageEstonia/_MG_4022.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/EngageEstonia/_MG_4025.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/EngageEstonia/_MG_4025.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/EngageEstonia/_MG_4028.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/EngageEstonia/_MG_4028.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/EngageEstonia/_MG_4029.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/EngageEstonia/_MG_4029.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/EngageEstonia/_MG_4043.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/EngageEstonia/_MG_4043.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/EngageEstonia/_MG_4044.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/EngageEstonia/_MG_4044.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/EngageEstonia/_MG_4057.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/EngageEstonia/_MG_4057.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/EngageEstonia/_MG_4064.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/EngageEstonia/_MG_4064.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/EngageEstonia/_MG_4072.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/EngageEstonia/_MG_4072.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/EngageEstonia/_MG_4073.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/EngageEstonia/_MG_4073.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/EngageEstonia/_MG_4095.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/EngageEstonia/_MG_4095.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/EngageEstonia/_MG_4103.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/EngageEstonia/_MG_4103.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/EngageEstonia/_MG_4111.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/EngageEstonia/_MG_4111.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/EngageEstonia/_MG_4113.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/EngageEstonia/_MG_4113.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/EngageEstonia/_MG_4118.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/EngageEstonia/_MG_4118.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/EngageEstonia/_MG_4133.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/EngageEstonia/_MG_4133.jpg)"}}>
            </div>
          </a>
          <a href="/images/events/EngageEstonia/_MG_4169.jpg" data-lightbox="images">
            <div className="image" style={{"backgroundImage":"url(/images/events/EngageEstonia/_MG_4169.jpg)"}}>
            </div>
          </a>
        </div>
      </div>
      <div className="bottom-margin">
      <p>tere</p>
      </div>
		</div>
		        )
	}
})
