pipeline {
  options() {
    disableConcurrentBuilds()
  }
  agent any

  stages {

    stage('checkout') {
      steps {
        checkout scm
	sh 'git submodule update --init'
      }
    }

    stage('deploy') {
      when{
        branch 'source'
      }
      steps {
	    sh "cd public && git remote set-url origin git@github-ks-no.github.io:ks-no/ks-no.github.io.git"
        sh "./deploy.sh"
      }
    }
  }
}
