const axios = require("../utils/axiosHelper");
const transactions = require("../utils/transactions");

module.exports = app => {
  app.get("/balance", async (req, res) => {
    const { data } = await axios.get("/blocks?order=-1");
    const transactions = data.map(({ transactions }) => transactions[0]);
    const outputs = transactions.map(({ outputs }) => outputs);
    res.send(outputs);
  });

  app.get("/sign", (req, res) => {
    const keys = [
      {
        publicKey:
          "2d2d2d2d2d424547494e205055424c4943204b45592d2d2d2d2d0a4d4947664d413047435371475349623344514542415155414134474e4144434269514b42675144537a55683651517375485179776754317761306969523842620a4a50575a3941342f3241346d73574d6154705636414f654c45532b505a6c394d7679576a704d534a66543362774671682b436e374f4e634368574c44483447730a54434d5455574763774c70536c4c63306c4c4830395957684350627859726f336576554e3079692f3479657653516d6c36397558795244397534383676774c510a61617a74364a5a73794e3071344e7a6b31774944415141420a2d2d2d2d2d454e44205055424c4943204b45592d2d2d2d2d0a",
        privateKey:
          "2d2d2d2d2d424547494e205253412050524956415445204b45592d2d2d2d2d0a4d4949435867494241414b42675144537a55683651517375485179776754317761306969523842624a50575a3941342f3241346d73574d6154705636414f654c0a45532b505a6c394d7679576a704d534a66543362774671682b436e374f4e634368574c444834477354434d5455574763774c70536c4c63306c4c4830395957680a4350627859726f336576554e3079692f3479657653516d6c36397558795244397534383676774c5161617a74364a5a73794e3071344e7a6b31774944415141420a416f4742414c747a2f4f3171426130642b2f6a42464964786634642f5570673652345239754759686c49506e3366363476736464496f6c5234503864773855560a665430462b68646848613761594434443169456d4c4678376a4a506c6577377444394f73326c534a78496c4e30506e6e7248744a462f494d69536e6b516a69300a66355851757659713335634e576e6b46556d46534d48444151545776552b67316b6d55735a4454302f3134307a674352416b45413849653669335558774e38360a2b496f71736e6947612f617146737859706e57395636542f7150705847562f797459554d692f664c6d6478325a51506a6635627942582f447054416f5744732b0a2b74344f2f55445237514a42414f4263466370485966544c70592b2b32455371314b7635354c2f6658783657623567436e57344e564331364671536b2b5250380a6a682f776950465847334750756e66466f4e546149626858637131783551706c69564d435151436c34775975446a6975705961585354732f55553573415865330a4e34486764413138392b66334534696b6b48376b332f6b5351336b6843574b434d7064684e4b7141546d69526364417859644d4330386d45736f4c56416b45410a7850487771737a3466774f5a424e4c5a553458474247547257556243583735636e55714757596e5876386678516e775372576e41644f6358767772673631486f0a744b544635724c49634f4a4b703168595830543851774a416668446a2f424c2b4847744565394447647731576a43324d4a4451635058387a51584134466c41590a42537a777978726f6b685a4b7046466c66544962483539507063764377324d5864376859496c6e6b452f336735513d3d0a2d2d2d2d2d454e44205253412050524956415445204b45592d2d2d2d2d0a",
        address:
          "3ef9e4a9fdcdf96c9a75a2c8f550c6436b916cc005e1d0769d20172bd6c90b18"
      }
    ];
    let bountyTransaction = {
      version: 1,
      inputs: [],
      outputs: []
    };
    bountyTransaction.inputs.push({
      referencedOutputHash:
        "9e09a4143c78eef1875e2faf8d5b93aea5d7279c910209a55e9c258d8c3045fe",
      // "6d97526dc919784ffabefd21adfffe56ab2384e43e41b085a54f5fd39ee6654c",
      referencedOutputIndex: 33,
      unlockScript: ""
    });
    bountyTransaction.outputs.push({
      value: 9999,
      lockScript:
        "ADD " +
        "3ef9e4a9fdcdf96c9a75a2c8f550c6436b916cc005e1d0769d20172bd6c90b18"
    });
    bountyTransaction.outputs.push({
      value: 1,
      lockScript:
        "ADD " +
        "e3d153912fc8393136865a8ee94d0a64671783cb29ec86ae2d08fee17df3ff95"
    });

    transactions(bountyTransaction, keys);

    res.send({ bountyTransaction });
  });

  app.get("/index", async (req, res) => {
    const { data } = await axios.get(
      "/transactions/6d97526dc919784ffabefd21adfffe56ab2384e43e41b085a54f5fd39ee6654c"
    );
    const output = data.outputs
      .map(
        ({ lockScript }, index) =>
          lockScript.substring(4) ===
          "3ef9e4a9fdcdf96c9a75a2c8f550c6436b916cc005e1d0769d20172bd6c90b18"
            ? index
            : -1
      )
      .filter(index => index !== -1);
    res.send({ index: output[0] });
  });
};