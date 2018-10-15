#!groovy

/*node {
  
  currentBuild.result = "SUCCESS"
  
  try {
    checkout scm
    / *print 'Installing dependencies'* /
    sh 'npm install'
    sh 'pwd'
  }
  catch (err) {
    currentBuild.result = "FAILURE"
    / *print 'Caught an error'
    print err
    print "project build error is here: ${env.BUILD_URL}"* /
    throw err
  }
}
*/

pipeline {
  agent any
  
  stages {
    
    stage('Checkout') {
      steps {
        // nothing yet
      }
    }
    
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
    
    stage('Deploy') {
      steps {
        echo 'deploy goes here'
      }
    }
  }
}
