const inspector = require('inspector');
const fs= require('fs')
session= new inspector.Session();

session.connect();
// Runtime Domain
// Runtime domain exposes JavaScript runtime by means of remote
// evaluation and mirror objects. Evaluation results are returned
// as mirror object that expose object type, string representation
// and unique identifier that can be used for further object
// reference. Original objects are maintained in memory unless
// they are either explicitly released or are released along with
// the other objects in their object group.
// @link https://chromedevtools.github.io/devtools-protocol/v8/Runtime

session.post('Runtime.evaluate', { expression: '2 + 2' },
             (error, { result }) => console.log(result));

// expected result
// { type: 'number', value: 4, description: '4' }

session.disconnect();


// FOR CPU Profiler
// @link https://chromedevtools.github.io/devtools-protocol/v8/Profiler
session.connect();
session.post('Profiler.enable',()=>{
    session.post('Profiler.start',()=>{
        // Invoke business logic under measurement here...
        setTimeout(()=>{ console.log("Hello, Potato"); }, 3001);

        // some time later...
        session.post('Profiler.stop',(err, {profile})=>{
            // Write profile to disk, upload, etc.
            if (!err) {
                fs.writeFileSync('./profiler/profile.cpuprofile',
                JSON.stringify(profile));
                console.log(profile)
            }
        })
    })
})
session.disconnect();

// For HEAP profiler
// Experimental at 24/11/2019
// @link https://chromedevtools.github.io/devtools-protocol/v8/HeapProfiler
const fd = fs.openSync('./profiler/profile.heapsnapshot', 'w');
session.connect();

session.on('HeapProfiler.addHeapSnapshotChunk', (m) => {
    fs.writeSync(fd, m.params.chunk);
});

session.post('HeapProfiler.takeHeapSnapshot', null, (err, r) => {
    console.log('HeapProfiler.takeHeapSnapshot done:', err, r);
    session.disconnect();
    fs.closeSync(fd);
});

// Comment from Sylia:
// Feel free to comment the unneeded code