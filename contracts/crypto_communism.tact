import "@stdlib/deploy";
import "./jetton.tact";
import "./game.tact";

contract CryptoCommunism with Deployable, Jetton, Game {
  seqno: Int as uint64;

  jettonWalletAddress: Address;
  admin: Address;
  balance: Int as uint64;

  winner: Int as int8 = -1;
  round: Int as uint8 = 0;
  MaxPlayers: Int = 5;
  players: map<Int as uint8, Player>;
  playersLength: Int as uint8 = 0;

  override fun sendPrize(address: Address) {
    self.sendJetton(Withdraw{ amount: self.balance, destination: address, queryId: self.seqno });
  }

  init(seqno: Int, initBalance: Int, jettonWalletCode: Cell, jettonMasterAddress: Address, playersList: Cell) {
    self.seqno = seqno;
    self.admin = sender();
    self.balance = initBalance;

    self.jettonWalletAddress = calculateJettonWalletAddress(
      myAddress(),
      jettonMasterAddress,
      jettonWalletCode,
    );

    self.players = emptyMap();
    let ps: Slice = playersList.asSlice();

    while (ps.refs() > 0) {
      self.pushPlayer(ps.loadAddress(), ps.loadCoins());
      if (ps.refs() > 0) {
        ps = ps.loadRef().asSlice();
      }
    }

    self.pushPlayer(ps.loadAddress(), ps.loadCoins());
  }


  receive(msg: Moves) {
    require(sender() == self.admin, "Forbidden");
    require(self.winner == -1, "Game finished");

    let ps: Slice = msg.head.asSlice();

    while (ps.refs() > 0) {
      self.onMove(ps);
      if (ps.refs() > 0) {
        ps = ps.loadRef().asSlice();
      }
    }

    self.onMove(ps);
  }

  receive(msg: Withdraw) {
    require(sender() == self.admin, "Forbidden");
    self.sendJetton(msg);
  }
}
