injectTapEventPlugin()
var {
    Dialog,
    Styles,
} = MUI;
var { ThemeManager, LightRawTheme } = Styles;

Landing = React.createClass({
	childContextTypes: {
        muiTheme: React.PropTypes.object,
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
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
      <tbody>
        <tr>
          <td className="left">
            <h3>{T("landing","tagline_client")}</h3>
            <div onClick={this.goNewOrder} className="btn order">
              <p style={{fontSize: "1.3em", padding: "0.25em"}}><strong>{T("landing","order_now")}></strong> </p>
            </div>
          </td>
          <td className="right">
            <h3>{T("landing","tagline_chef")}</h3>
            <div onClick={this.goLogin} className="btn chef">
              <p style={{fontSize: "1.3em", padding: "0.25em"}}><strong>{T("landing","signup")}></strong> </p>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div className="bottom">
        <a className="facebook" href="https://www.facebook.com/toitlacom" target="_blank">Facebook</a>
      </div>
      <h1 className="huge2">{T("landing","contact")}</h1>
      <p className="tekst">food@toitla.com</p>
      <p className="tekst">+372 521 6686</p>
      <p className="tekst">Orase 4a, Tallinn, Estonia</p>
      <h1 className="huge">{T("landing","about_us")}</h1>
      <p className="tekst" dangerouslySetInnerHTML={T("landing","about_us_content", true)}></p>
      <h1 className="huge">{T("landing","we_offer")}</h1>
      <p className="tekst" dangerouslySetInnerHTML={T("landing","we_offer_content", true)}></p>
      <div className="gallery">
        <h1 className="huge2" dangerouslySetInnerHTML={T("landing","tagline_served", true)}></h1>
        <h1>{T("landing","fleep")}</h1>
        <h2>{T("landing","fleep_content")}</h2>
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
        <h1>{T("landing","GG")}</h1>
        <h2>{T("landing","GG_content")}</h2>
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
        <h1>{T("landing","engage_estonia")}</h1>
        <h2>{T("landing","engage_estonia_content")}</h2>
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
