require('dotenv').config({ path: '.env' });
const RANDOM_SUFFIX = require('child_process').execSync("cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 4 | head -n 1").toString().trim();
const PROJECT_NAME = `test_${RANDOM_SUFFIX}`;


module.exports = {
    apps: [
        {
            name: "good",
            script: "neurons/miner.py",
            interpreter: "python3",
            args: `--local --local_uid 1 --subtensor.network ws://127.0.0.1:9945 --netuid 1  --project "${PROJECT_NAME}" --device cuda:3 --peers 0 1 2`
        },
        {
            name: "bad",
            script: "neurons/miner.py",
            interpreter: "python3",
            args: `--local --local_uid 2 --subtensor.network ws://127.0.0.1:9945 --netuid 1  --project "${PROJECT_NAME}" --device cuda:2 --peers 0 1 2`
        },
        {
            name: "vali",
            script: "neurons/val_sim.py",
            interpreter: "python3",
            args: `--local --local_uid 0 --subtensor.network ws://127.0.0.1:9945 --netuid 1  --project "${PROJECT_NAME}" --device cuda:1 --peers 0 1 2`
        }
    ]
};