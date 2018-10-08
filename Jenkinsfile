#!groovy

node {
  
  currentBuild.result = "SUCCESS"
  
  try {
    checkout scm
    echo 'Installing dependencies'
    sh 'npm install'
    sh 'pwd'
  }
  catch (err) {
    currentBuild.result = "FAILURE"
    echo 'Caught an error'
    echo err
    echo "project build error is here: ${env.BUILD_URL}"
    throw err
  }
}
