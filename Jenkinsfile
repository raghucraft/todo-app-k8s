pipeline {
    agent any
      
    stages {
        stage('checkout') {
            steps {
                checkout scm
            }
        }
        stage('Verify')
            steps {
                sh 'echo "Todo App pipeline started"'
                sh 'ls -la'
            }
    }
}    