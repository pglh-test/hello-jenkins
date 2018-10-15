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
        // echo branch name
        echo 'Branch name is: ' + env.BRANCH_NAME
        sh 'pwd'
        sh 'ls'
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
