import React, { Component } from "react";
import CurrencyFormat from "react-currency-format";

class App extends Component {
  state = {
    type: 'diário',
    total: 0,
    useful: 0,
    value: 0
  };

  calendar = {
    total: 365,
    useful: 252
  };

  update() {
    let val = this.state.value
    this.setState({ total: 0 })
    this.setState({
      total: this.state.type === "diário" ? (val * this.calendar.total) / 100 : (val * 12) / 100,
      useful: (val * this.calendar.useful) / 100,
    });
  } 

  changeType(e) {
    this.setState({ type: e.target.value }, () => {
      this.update();
    });
  }

  render() {
    return (
      <div>
        <section className="hero is-info is-bold has-text-centered">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Vale a pena?</h1>
              <h2 className="subtitle">Calcule o preço anual de um item e economize dinheiro</h2>
              <a href="https://github.com/lhcgoncalves/worthit" target="_blank" rel="noopener noreferrer">Deixe sua ★ no GitHub</a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-fluid has-text-centered">
            <div className="field">
              <div className="control">
                <input type="radio" onChange={(e) => this.changeType(e)} name="type" value="diário" checked={this.state.type === "diário"}  /> Diário{" "}
                <input type="radio" onChange={(e) => this.changeType(e)} name="type" value="mensal" checked={this.state.type === "mensal"}  /> Mensal
              </div>
            </div>          
            <div className="field">
              <div className="control">
                <CurrencyFormat
                  decimalSeparator={","}
                  thousandSeparator={"."}
                  fixedDecimalScale={true}
                  decimalScale={2}
                  isNumericString={true}
                  prefix={"R$ "}
                  className="input is-large has-text-centered"
                  placeholder="R$ 0,00"
                  onValueChange={values => {
                    const { value } = values;
                    let val = parseInt(value.toString().replace(".", ""));
                    this.setState({ value: val }, () => { this.update() } )
                  }}
                />
              </div>
            </div>
            {this.state.total > 0 && (
              <div>
                <p>Seu custo anual com esse item {this.state.type} é de:</p>
                <div className="box">
                  Por ano:
                  <CurrencyFormat
                    value={this.state.total}
                    displayType={"text"}
                    decimalSeparator={","}
                    fixedDecimalScale={true}
                    decimalScale={2}
                    thousandSeparator={"."}
                    prefix={"R$ "}
                    renderText={value => <h2 className="title">{value}</h2>}
                  />
                </div>

                {this.state.type === "diário" && (
                <div className="box">
                  Em dias úteis:
                  <CurrencyFormat
                    value={this.state.useful}
                    displayType={"text"}
                    decimalSeparator={","}
                    fixedDecimalScale={true}
                    decimalScale={2}
                    thousandSeparator={"."}
                    prefix={"R$ "}
                    renderText={value => <h2 className="title">{value}</h2>}
                  />
                </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
