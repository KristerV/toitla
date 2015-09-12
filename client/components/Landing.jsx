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
		FlowRouter.go('/telli')
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
				Võtame teiega mõne päeva jooksul ühendust. Kiireloomuliste küsimustega võite pöörduda meie poole e-mailiga appi@toitla.com või telefoniga 5385 2331.
			</Dialog>
      <div className="logo"><img className="toitla" src="/icons/white-toitla.svg"/>
      </div>
      <table className="main">
        <tr>
          <td className="left">
            <h2>Soovid paremat toitu oma üritusele? Meie toitu Sa poest ei leia! </h2>
            <div onClick={this.goNewOrder} className="btn order">
              <p><strong>Telli</strong> </p>
            </div>
          </td>
          <td className="right">
            <h2>Meeldib kokata? <br/> Tee algus esimeste tellimustega! </h2>
            <div onClick={this.goLogin} className="btn chef">
              <p><strong>Liitu</strong> </p>
            </div>
          </td>
        </tr>
      </table>
      <div className="bottom">
        <a className="facebook" href="https://www.facebook.com/toitlacom" target="_blank">Facebook</a>
      </div>
      <h1 className="huge">Meist</h1>
      <p className="tekst">Oleme punt tegusaid StartUppijaid ja tegeleme kodukokkade turule toomisega. Liiga palju on neid osavaid kodus tegutsevaid kokkasid, kelle imelised hõrgutised on avalikkuse eest peitu jäänud. Hetkel katame lauda viiele ja rohkem, ehk siis sünnipäevadest ja koosolekutest kuni suurte üritusteni. Oleme edukalt serveerinud sadat inimest terveks päevaks.</p>
      <div className="gallery">
        <h1 className="huge">Edukad üritused</h1>
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
      </div>
		</div>
		        )
	}
})
