<script>
    import { toast } from '@zerodevx/svelte-toast'

    let email = "";
    fetch("/api/user")
      .then((res) => res.json())
      .then((result) => {
        email = result.email;
    });
    
    
</script>
<body>
    <h1 class="center">Welcome to my secure boat website</h1>
      <h1 class="center">Boat Display</h1>

      <h2 class="center">Nord</h2>
      <div class="boats-div">
        <p>Nord started life as Project Redwood, then Opus. Everyone involved in her design and build has remained tight-lipped about the details, but build manager Rob Moran shared some exclusive insight with BOAT International.
        <p>First up, she has an Ice Class hull for real exploration. Her aluminium superstructure runs to four decks, contained within the dramatic sweep of a black-painted arch – a key part of the vision of designers Nuvolari Lenard. Not one but two helipads are in evidence, while a vast beach club and tender garage gives  “space to store a plethora of toys including 16 tenders, a submarine and an ROV”, according to Moran.</p>
      <img src="https://cdn.boatinternational.com/convert/files/2020/12/7a18d620-3bcb-11eb-957a-6996e21593a4-top-25-nord-credit-Tom-Van-Oossanen.jpg/r%5Bwidth%5D=1920/7a18d620-3bcb-11eb-957a-6996e21593a4-top-25-nord-credit-Tom-Van-Oossanen.webp" alt="" class="img-sizing">
      </div>
      
      <br>

      <h2 class="center">Flying Fox</h2>
      <div class="boats-div">
        <p>Formerly Project Shu, PYC-compliant Flying Fox was built by Lürssen for an experienced serial charter yacht owner and completed her sea trials off the coast of Germany in May 2019.</p>
        <p>The 136-metre, six-deck yacht towers 32 metres above the waterline – as tall as three London buses balanced end on end. Her elegant, well-balanced profile by Espen Oeino conceals an extraordinarily voluminous interior by Mark Berryman, including a double-height atrium that forms the main deck lobby. There are 11 cabins for 36 guests, all with private sea-view terraces, and expansive outdoor living spaces, such as a 12 metre swimming pool transversing the main deck aft, swim platforms and two helipads. The 400m2 spa is the stand-out feature. It has heated limestone floors, a Hammam, massage and beauty treatment rooms and the first cryosauna ever installed on a yacht with a main chamber that reaches a chilly -110C. There's also an on-board hospital.</p>
      <img src="https://cdn.boatinternational.com/convert/files/2020/12/e2728480-3bb4-11eb-957a-6996e21593a4-top-25-flying-fox-credit-Guillaume-Plisson-for-Imperial.jpg/r%5Bwidth%5D=1920/e2728480-3bb4-11eb-957a-6996e21593a4-top-25-flying-fox-credit-Guillaume-Plisson-for-Imperial.webp" alt="" class="img-sizing">
      </div>

      <br>

      <h2 class="center">Serene</h2>
      <div class="boats-div">
        <p>Built for a Russian owner, Serene was the first superyacht delivered by Italian yard Fincantieri. She can accommodate up to 24 guests and 52 crew, and boasts 4,500 square metres of interior space designed by Reymond Langton.</p>
        <p>She has seven decks, two helipads and a hangar, carries a custom submarine certified to 100m depth and has underwater viewing ports in her Nemo room.  A snow room can make up to four inches of snow, while the impressive spiral staircase rises through six decks and is lit by a large skylight. </p>
      <img src="https://cdn.boatinternational.com/convert/files/2020/12/8f84d000-3bd9-11eb-957a-6996e21593a4-top-25-serene-credit-Marc-Paris.jpg/r%5Bwidth%5D=1920/8f84d000-3bd9-11eb-957a-6996e21593a4-top-25-serene-credit-Marc-Paris.webp" alt="" class="img-sizing">
      </div>

      <br>

      <h2 class="center">Octupus</h2>
      <div class="boats-div">
        <p>Octopus was owned by the late Paul Allen, one of the founders of Microsoft, who also owned Tatoosh. She is one of the largest explorer yachts in the world and was designed by Espen Oeino with interiors by Jonathan Quinn Barnett and Sam Sorgiovanni.</p>
        <p>Octopus features a helicopter pad and garage aft and can also accept a second helicopter on the bows. Her impressive deck also features a glass-bottom swimming pool which can transform into a dancefloor with a nearby bar for drinks served poolside.</p>
      <img src="https://cdn.boatinternational.com/convert/files/2021/11/dd438840-488a-11ec-95c5-cf1b27c5ef24-octopus-new-pictures-courtesy-of-camper-%26-nicholsons.jpg/r%5Bwidth%5D=1920/dd438840-488a-11ec-95c5-cf1b27c5ef24-octopus-new-pictures-courtesy-of-camper-%26-nicholsons.webp" alt="" class="img-sizing">
      </div>

      {#if email}
    {toast.push(`Welcome ${email}`, {
    theme: {
      '--toastColor': 'mintcream',
      '--toastBackground': 'rgba(72,187,120,0.9)',
      '--toastBarBackground': '#2F855A'
    }
  })}
    {/if}
    
</body>


<style>
p{
  color: whitesmoke;
}
    .center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  text-align: center;
}

.boats-div{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 75%;
  text-align: center;
}

.img-sizing{
  height: 400px;
}
</style>