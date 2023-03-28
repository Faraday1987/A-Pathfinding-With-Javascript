<h1 class="code-line" data-line-start=0 data-line-end=1 ><a id="A_Pathfinding_With_Javascript_0"></a>A* Pathfinding With Javascript</h1>
<h4 class="code-line" data-line-start=1 data-line-end=2 ><a id="_The_New_WayFinding_Software_Ever__1"></a><em>The New WayFinding Software, Ever</em></h4>
<p class="has-line-data" data-line-start="2" data-line-end="3">✨A*  Javascript Canvas✨</p>
<p class="has-line-data" data-line-start="4" data-line-end="5"><a href="https://res.cloudinary.com/damjgysop/image/upload/v1680038669/canvas/grid_zbglbo.png"><img src="https://res.cloudinary.com/damjgysop/image/upload/v1680038669/canvas/grid_zbglbo.png" alt="Wayfinding"></a></p>
<pre><code class="has-line-data" data-line-start="7" data-line-end="10" class="language-JAVASCRIPT">    <span class="hljs-comment">// find a path between two node Id's</span>
    <span class="hljs-built_in">console</span>.log(grid.findPath(<span class="hljs-string">"n1"</span>, <span class="hljs-string">"n6"</span>));
</code></pre>
<pre><code class="has-line-data" data-line-start="11" data-line-end="16" class="language-JS">{ 
<span class="hljs-string">"length"</span>:<span class="hljs-number">317.0904258104076</span>, <span class="hljs-string">"bestCase"</span>:<span class="hljs-number">317.0904258104076</span>,
<span class="hljs-string">"path"</span>:[<span class="hljs-string">"n1"</span>, <span class="hljs-string">"n2"</span>, <span class="hljs-string">"n4"</span>, <span class="hljs-string">"n6"</span>]
}
</code></pre>
<h2 class="code-line" data-line-start=17 data-line-end=18 ><a id="Search_A_From_JSON_Grid_PATH_17"></a>Search A* From JSON Grid PATH</h2>
<ul>
<li class="has-line-data" data-line-start="18" data-line-end="19">From data structure of a grid to run searches across. I’m drawn to JSON for raw data structures like this since it’s easy to compose.</li>
<li class="has-line-data" data-line-start="19" data-line-end="20">Here’s a simple JSON grid of points of this image:</li>
</ul>
<pre><code class="has-line-data" data-line-start="21" data-line-end="53" class="language-json">    { "<span class="hljs-attribute">n1</span>": <span class="hljs-value">{
      "<span class="hljs-attribute">x</span>": <span class="hljs-value"><span class="hljs-string">"25"</span></span>,
      "<span class="hljs-attribute">y</span>": <span class="hljs-value"><span class="hljs-string">"25"</span></span>,
      "<span class="hljs-attribute">join</span>": <span class="hljs-value"><span class="hljs-string">"n2,n3"</span>
    </span>}</span>,
    "<span class="hljs-attribute">n2</span>": <span class="hljs-value">{
      "<span class="hljs-attribute">x</span>": <span class="hljs-value"><span class="hljs-string">"110"</span></span>,
      "<span class="hljs-attribute">y</span>": <span class="hljs-value"><span class="hljs-string">"110"</span></span>,
      "<span class="hljs-attribute">join</span>": <span class="hljs-value"><span class="hljs-string">"n1,n3,n4"</span>
    </span>}</span>,
    "<span class="hljs-attribute">n3</span>": <span class="hljs-value">{
      "<span class="hljs-attribute">x</span>": <span class="hljs-value"><span class="hljs-string">"50"</span></span>,
      "<span class="hljs-attribute">y</span>": <span class="hljs-value"><span class="hljs-string">"180"</span></span>,
      "<span class="hljs-attribute">join</span>": <span class="hljs-value"><span class="hljs-string">"n1,n2,n5,n6"</span>
    </span>}</span>,
    "<span class="hljs-attribute">n4</span>": <span class="hljs-value">{
      "<span class="hljs-attribute">x</span>": <span class="hljs-value"><span class="hljs-string">"225"</span></span>,
      "<span class="hljs-attribute">y</span>": <span class="hljs-value"><span class="hljs-string">"90"</span></span>,
      "<span class="hljs-attribute">join</span>": <span class="hljs-value"><span class="hljs-string">"n2,n5,n6"</span>
    </span>}</span>,
    "<span class="hljs-attribute">n5</span>": <span class="hljs-value">{
      "<span class="hljs-attribute">x</span>": <span class="hljs-value"><span class="hljs-string">"190"</span></span>,
      "<span class="hljs-attribute">y</span>": <span class="hljs-value"><span class="hljs-string">"160"</span></span>,
      "<span class="hljs-attribute">join</span>": <span class="hljs-value"><span class="hljs-string">"n3,n4"</span>
    </span>}</span>,
    "<span class="hljs-attribute">n6</span>": <span class="hljs-value">{
      "<span class="hljs-attribute">x</span>": <span class="hljs-value"><span class="hljs-string">"230"</span></span>,
      "<span class="hljs-attribute">y</span>": <span class="hljs-value"><span class="hljs-string">"170"</span></span>,
      "<span class="hljs-attribute">join</span>": <span class="hljs-value"><span class="hljs-string">"n3,n4"</span>
    </span>}
  </span>}
</code></pre>
<h3 class="code-line" data-line-start=54 data-line-end=55 ><a id="SAMPLES_54"></a>SAMPLES</h3>
<p class="has-line-data" data-line-start="56" data-line-end="57"><a href="https://res.cloudinary.com/damjgysop/image/upload/v1680040767/canvas/1_rgt5wn.png"><img src="https://res.cloudinary.com/damjgysop/image/upload/v1680040767/canvas/1_rgt5wn.png" alt="Wayfinding1"></a></p>
<p class="has-line-data" data-line-start="58" data-line-end="59"><a href="https://res.cloudinary.com/damjgysop/image/upload/v1680040770/canvas/1-2_bdmlff.png"><img src="https://res.cloudinary.com/damjgysop/image/upload/v1680040770/canvas/1-2_bdmlff.png" alt="Wayfinding2"></a></p>
<p class="has-line-data" data-line-start="60" data-line-end="61"><a href="https://res.cloudinary.com/damjgysop/image/upload/v1680040774/canvas/1-5_alpzqu.png"><img src="https://res.cloudinary.com/damjgysop/image/upload/v1680040774/canvas/1-5_alpzqu.png" alt="Wayfinding2"></a></p>
<h2 class="code-line" data-line-start=61 data-line-end=62 ><a id="License_61"></a>License</h2>
<p class="has-line-data" data-line-start="62" data-line-end="63">MIT</p>
<p class="has-line-data" data-line-start="64" data-line-end="65"><strong>Free Software, Hell Yeah!</strong></p>
