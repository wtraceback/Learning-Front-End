分布式版本控制（Git）：
    作用：能自动帮我记录每次文件的改动("版本")，还可以让同事协作编辑
    分布式：有一个中央服务器用于跟人协作，而且每个人的电脑上也都有一个包含完整的历史版本的版本库


    安装Git：去官网下载可执行文件，双击默认安装、安装完成后在Git Bash里进行最后一步设置：
        git config --global user.name "Your Name"
        git config --global user.email "email@example.com"


    创建新的仓库：
        git init    创建新的git仓库

    提交当前修改至当前分支：
        1、git add filename    将文件从工作区加入暂存区(可多次添加 1 至 n 个)
        2、git commit -m "commit message"    将暂存区中的文件提交至HEAD所指向的分支

        git status    查看仓库当前状态


    查看历史版本：
        git log    可以查看提交历史记录，从最新到最开始的提交日志
            加上 --pretty=oneline 参数可以简化历史记录的显示
        git reflog    查看命令历史，以便确定要回到未来的哪个版本

        在使用git log命令查看log的时候，如果log太多，想退出时，按一下 q 键即可


    文件比较：
        git diff    是工作区(work dict)和暂存区(stage)的比较修改内容
        git diff --cached    是暂存区(stage)和分支(master)的比较修改内容
        git diff HEAD -- filename    命令可以查看工作区和版本库里面最新版本的区别


    回退：
        HEAD    指向当前分支的当前版本
        git reset --hard HEAD^    回退到上一个版本
        git reset --hard HEAD^^    回退到上上一个版本
        git reset --hard HEAD~1    回退到上一个版本，以此类推
        git reset --hard commit-id    回退到某个指定的版本


    撤销操作：
        场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- filename
        场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD filename，就回到了场景1，第二步按场景1操作。
        场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，可以通过 git reset --hard commit-id 回退到某个指定的版本

    删除文件：
        从版本库中删除该文件，那就用命令 git rm 删掉，并且 git commit -m "message" 提交


    远程仓库：
        git remote    查看远程仓库的信息
        git remote -v    显示远程仓库更详细的信息。

        git remote add origin git@server-name:path/repo-name.git    关联一个远程仓库
        git push -u origin master    推送master分支的所有内容，第一次使用加上了-u参数，是推送内容并关联分支。

        git push origin master    后面的推送，就可以使用该条命令，推送最新修改至远程仓库
        git pull origin master    取回远程仓库某个分支的更新
        git remote rm myremote    清除远程仓库

        git push origin branch-name    推送分支，指定本地的分支，Git会把该分支推送到远程库对应的远程分支上
        git clone address    从远程库clone时，默认情况下，只能看到本地的master分支。
        git checkout -b dev origin/dev    就得创建远程仓库中origin的dev分支到本地


    分支管理：
        因为 Git 创建、合并和删除分支非常快，所以Git鼓励你使用分支完成某个任务，合并后再删掉分支，
        这和直接在master分支上工作效果是一样的，但过程更安全。
            1、(新功能) 创建新的分支，然后在这上面开发，开发完毕，合并，然后删除
            2、(bug) 创建新的分支，然后在这上面改bug，开发完毕，合并，然后删除

        git branch    查看分支
        git branch <name>    创建分支
        git checkout <name>    切换分支
        git checkout -b <name>    创建 + 切换分支
        git branch -d <name>    删除分支
        git branch -D <name>    强行删除分支，丢弃一个没有被合并过的分支

        git merge <name>    合并某分支到当前分支(默认使用Fast forward模式来合并分支)
        git merge --no-ff -m "merge with no-ff" <name>    合并分支时，加上--no-ff参数就可以用普通模式合并，
        表示禁用Fast forward，普通模式合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。
        git log --graph    可以看到分支合并图
        git log --graph --pretty=oneline --abbrev-commit    查看分支历史
        当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。

        储藏：
        git stash    提供了一个stash功能，可以把当前工作现场“储藏”起来，保留当前工作区的情况
        git stash list    命令查看保存的工作现场位置
        git stash apply    恢复保存之前的工作状态，但是恢复后，stash内容并不删除
        git stash drop    删除stash内容
        git stash pop    恢复stash内容 + 删除
        git stash apply stash@{0}    恢复指定的stash

        多人协作的工作模式通常是这样：
            首先，可以试图用git push origin branch-name推送自己的修改；
            如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
            如果合并有冲突，则解决冲突，并在本地提交；
            没有冲突或者解决掉冲突后，再用git push origin branch-name推送就能成功！
            如果git pull提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream branch-name origin/branch-name。
            这就是多人协作的工作模式，一旦熟悉了，就非常简单。


    标签管理：
        git tag    查看所有标签
        git tag <name>    新建一个标签，默认为HEAD，也可以指定一个commit id
        git tag <name> commit-id    给之前提交的commit打上标签
        git show <tagname>    查看标签信息
        git tag -a <name> -m "version 0.1 released" commit-id    还可以创建带有说明的标签，用-a指定标签名，-m指定说明文字
        git tag -s <tagname> -m "blablabla..."   可以用PGP签名标签

        git push origin <tagname>    可以推送一个本地标签到远程仓库
        git push origin --tags    一次性推送全部未推送过的本地标签至远程仓库
        git tag -d <tagname>    可以删除一个本地标签
        git push origin :refs/tags/<tagname>    可以删除一个远程仓库里的标签（先删除本地的、再删除远程的）


    修改开源项目代码并提交：
        在GitHub上，可以任意Fork开源仓库；
        自己拥有Fork后的仓库的读写权限；
        可以推送pull request给官方仓库来贡献代码。
