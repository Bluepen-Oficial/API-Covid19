git add .
read -p "Mensagem do commit > " mensagem
git commit -m "$mensagem"
git branch -M main
git push -u origin main